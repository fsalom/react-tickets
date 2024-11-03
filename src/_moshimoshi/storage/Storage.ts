import {TokenType} from "./TokenType";
import {Token} from "../entity/Token";

export interface Storage {
    save(tokens: Token, type: TokenType): void;
    retrieve(type: TokenType): Token | null;
    deleteAll(): void;
}