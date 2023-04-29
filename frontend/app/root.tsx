import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br'
import { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ptBR } from "@mui/material/locale";
import tailwindcss from "~/tailwind.css";
import { ThemeProvider, createTheme } from "@mui/material";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindcss },
];

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ptBR,
);

export default function App() {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pt-br'}>
          <ThemeProvider theme={theme}>
            <Outlet />
          </ThemeProvider>
        </LocalizationProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}