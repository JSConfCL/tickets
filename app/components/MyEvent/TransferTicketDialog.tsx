import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Alert, AlertDescription } from "~/components/ui/alert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { cn } from "~/utils/utils";

import { useTransferTicketMutation } from "./graphql/tranferTicket.generated";

const StartTransferTicketSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido.",
    })
    .email("El email no es válido."),
  name: z.string({
    required_error: "El nombre es requerido.",
  }),
  message: z.string({}),
});

export const TransferTicketDialog = ({
  open,
  onOpenChange,
  ticketId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId: string;
}) => {
  const [transferTicket] = useTransferTicketMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const form = useForm<z.infer<typeof StartTransferTicketSchema>>({
    resolver: zodResolver(StartTransferTicketSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({
    email,
    name,
    message,
  }: z.infer<typeof StartTransferTicketSchema>) => {
    setIsDisabled(true);
    await transferTicket({
      variables: {
        ticketId,
        input: {
          email,
          name,
          message,
        },
      },
      onCompleted(data) {
        // Redirect to payment page
        if (data.transferMyTicketToUser?.id) {
          setIsDisabled(false);
          toast.success(
            `La transferenciaha se ha hecho exitosamente. Hemos notificado al ${email}. Ahora, ${name} tiene 7 días para aceptar la transferencia o será revertida.`,
          );
          form.reset();
          onOpenChange(false);
        } else {
          setIsDisabled(false);
          toast.error(
            "Ocurrió un error al intentar transferir el ticket. Por favor intenta de nuevo.",
          );
        }
      },
      onError() {
        setIsDisabled(false);
        toast.error(
          "Ocurrió un error al intentar transferir el ticket. Por favor intenta de nuevo.",
        );
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Transferir Ticket</AlertDialogTitle>
          <Alert variant="destructive" className="!mb-4">
            <AlertCircle className="size-4" />
            <AlertDescription>
              Una vez hayas iniciado la transferencia del ticket no podrás
              revertirlo. Asegúrate de que la persona a la que le estás
              transfiriendo el ticket es de confianza.
            </AlertDescription>
          </Alert>
          <AlertDialogDescription>
            Ingresa el email de la persona a la que deseas transferir el ticket.
          </AlertDialogDescription>
          <Form {...form}>
            <form onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}>
              <div className="mt-4 flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje</FormLabel>
                      <FormControl>
                        <Input placeholder="Mensaje" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 md:gap-0">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              onClick={() => {
                form.reset();
              }}
            >
              Cancelar
            </Button>
          </AlertDialogCancel>
          <Button
            disabled={isDisabled}
            className={cn(
              "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            )}
            onClick={() => {
              void form.handleSubmit(onSubmit)();
            }}
          >
            Entiendo, Transferir
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
