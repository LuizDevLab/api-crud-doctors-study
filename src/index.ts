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

app.get("/docs/id/:id", (req: Request, res: Response) => {
  const userId: number = Number(req.params.id);

  const usuariosEncontrados: Medico | undefined = medicos.find(
    (user) => user.id == userId
  );
  if (!usuariosEncontrados) {
    return res.status(404).json("Médico não encontrado!");
  }

  return res.json(usuariosEncontrados)
});

app.get("/docs/especialidade/:especialidade", (req: Request, res: Response) => {
  const areaMedica: string = String(req.params.especialidade)
  const encontrado: Medico | undefined = medicos.find((user) => user.especialidade == areaMedica)

  if (!encontrado) {
    return res.status(404).json("área médica não encontrado");
  }

  return res.json(encontrado)
})

app.post("/docs", (req: Request, res: Response) => {
  const { nome, crm, especialidade } = req.body;

  const maxId: number = medicos.reduce((max, doc) => (doc.id > max ? doc.id : max), 0);
  const novoMedico: Medico = { id: maxId + 1, nome, crm, especialidade }

  medicos.push(novoMedico);
  return res.status(201).json(medicos)
})