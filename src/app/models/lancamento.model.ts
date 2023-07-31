import { Transacao } from "../enums/transacao.enum";
import { CategoriaLancamento } from "./categoria-lancamento.model";
import { Usuario } from "./usuario.model";

export interface Lancamento {
    id: number;
    descricao: string;
    valor: number;
    transacao: Transacao;
    categoriaLancamento: CategoriaLancamento;
    usuario: Usuario;
    data: Date;
}
