import { Company } from "./company";

export interface User {
    id: number;
    name:  string;
    company: Company;
}