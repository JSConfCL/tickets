import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useMyProfileSuspenseQuery } from "~/components/Profile/graphql/myProfile.generated";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { urls } from "~/utils/urls";
import { cn } from "~/utils/utils";

import { useUpdateUserMutation } from "./graphql/updateUser.generated";

const UpdateUserSchema = z.object({
  name: z
    .string({ required_error: "El nombre es requerido." })
    .min(1, "El nombre es requerido."),
  lastName: z
    .string({ required_error: "El apellido es requerido." })
    .min(1, "El apellido es requerido."),
  username: z
    .string({ required_error: "El nombre de usaurio es requerido." })
    .min(1, "El nombre de usaurio es requerido."),
});

const USERNAME_ALREADY_EXISTS =
  'duplicate key value violates unique constraint "users_username_unique"';

export const MyProfileInfo = () => {
  const navigate = useNavigate();
  const { data } = useMyProfileSuspenseQuery();
  const [updateUser, { loading: isLoading }] = useUpdateUserMutation();

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: "",
      lastName: "",
      username: "",
    },
  });

  useEffect(() => {
    form.setValue("name", data.me?.name ?? "");
    form.setValue("lastName", data.me?.lastName ?? "");
    form.setValue("username", data.me?.username ?? "");
  }, [form, data]);

  const onSubmit = async ({
    name,
    lastName,
    username,
  }: z.infer<typeof UpdateUserSchema>) => {
    await updateUser({
      variables: {
        input: {
          id: data.me.id,
          name,
          lastName,
          username,
        },
      },
      onCompleted() {
        toast.success("Datos Actualizados.", {
          description: "Los datos se han actualizado correctamente.",
        });
        navigate(urls.profile.root);
      },
      onError(error) {
        const message =
          error.message == USERNAME_ALREADY_EXISTS
            ? "Nombre de usuario en uso. Debes elegir otro nombre de usuario"
            : "Error Desconocido";

        toast.error("Hubo un error.", {
          description: `${message}. Verifica que hayas ingresado correctamente la información  e intenta nuevamente, si el error persiste comunicate con el equipo.`,
        });
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-[800px] md:p-4">
      <div>
        <Card className="mx-auto w-full max-w-md rounded-xl shadow-md lg:w-96">
          <CardTitle className="p-6 pb-4 text-xl font-semibold">
            Datos Básicos
          </CardTitle>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
                className={"grid w-full items-start gap-6  pt-0"}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Apellido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de Usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de Usuario" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col justify-end gap-4 md:flex-row">
                  {isLoading ? (
                    <Button variant="secondary" disabled>
                      Cancelar
                    </Button>
                  ) : (
                    <Link
                      to={urls.profile.root}
                      className={cn(buttonVariants({ variant: "secondary" }))}
                    >
                      Cancelar
                    </Link>
                  )}
                  <Button disabled={isLoading}>Guardar</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
