import { Injectable, signal } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class SuccessService {
    private _success = signal<string | null>(null);

    public success = this._success.asReadonly();

    setSuccess(message: string): void{
        this._success.set(message);
        setTimeout(() => this._success.set(null), 5000);
    }

}