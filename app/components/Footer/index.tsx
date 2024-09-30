import { SiLinkedin, SiX, SiInstagram } from "@icons-pack/react-simple-icons";

export const Footer = () => {
  const year = new Date().getFullYear();
  const socials = [
    {
      icon: <SiLinkedin size={18} />,
      name: "linkedin",
      url: "https://www.linkedin.com/company/communityos",
    },
    { icon: <SiX size={18} />, name: "x", url: "https://x.com/communityos_" },
    {
      icon: <SiInstagram size={18} />,
      name: "instagram",
      url: "https://www.instagram.com/communityos.io/",
    },
  ];
  const links = [
    ["Código de conducta", "https://legal.communityos.io"],
    [
      "Términos y condiciones",
      "https://legal.communityos.io/terminos_de_compra_e_imagen",
    ],
    [
      "Política de privacidad",
      "https://legal.communityos.io/politica_de_privacidad",
    ],
    [
      "Terminos de servicio",
      "https://legal.communityos.io/terminos_de_servicio",
    ],
  ];

  return (
    <footer className="border-t bg-background/95 text-sm text-primary">
      <div className="container flex flex-col justify-between gap-4 py-8 md:flex-row">
        <div className="flex flex-col gap-4">
          <div>© {year} Proudly Powered by CommunityOS</div>
          <div className="flex gap-3">
            {socials.map(({ icon, name, url }) => (
              <a
                key={name}
                className="hover:underline"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          {links.map(([name, url]) => (
            <a
              key={name}
              className="hover:underline"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
