import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
export declare class PendingInterceptorService implements HttpInterceptor {
    private _pendingRequests;
    private _pendingRequestsStatus;
    private _filteredUrlPatterns;
    readonly pendingRequestsStatus: Observable<boolean>;
    readonly pendingRequests: number;
    readonly filteredUrlPatterns: RegExp[];
    private shouldBypass(url);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
export declare function PendingInterceptorServiceFactory(): PendingInterceptorService;
export declare let PendingInterceptorServiceFactoryProvider: {
    provide: typeof PendingInterceptorService;
    useFactory: () => PendingInterceptorService;
};
