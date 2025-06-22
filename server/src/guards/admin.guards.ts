import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

export class AdminGuard extends AuthGuard('admin-verify') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        return super.canActivate(context);
    }
}