import express from "express";
import { Express, Request, Response } from "express";

const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`A API está rodando na porta ${port}`);
});

app.use(express.json());

type Medico = {
  id: number;
  nome: string;
  crm: string;
  especialidade: string;
};

const medicos: Medico[] = [
  { id: 1, nome: "João", crm: "CRM-PB 12345", especialidade: "Cardiologista" },
  { id: 2, nome: "Carlos", crm: "CRM-PI 34516", especialidade: "Pediatra" },
  { id: 3, nome: "Jonas", crm: "CRM-PE 09876", especialidade: "Dermatologia" },
  {
    id: 4,
    nome: "Leopoldo",
    crm: "CRM-PB 54321",
    especialidade: "Cardiologista",
  },
];

app.get("/", (req: Request, res: Response) => {
  res.send("Bem vindo a minha API de médicos!");
});

app.get("/docs", (req: Request, res: Response) => {
  res.send(medicos);
});
