import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable , throwError} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
 
export interface ICorporate{
  CorporateId : number
  CorporateName : string 
  CorporateEmail : string
  CorporateRegNumber : string
  Password : string
  Balance : number
  State : string
  City : string
  Role : string
  IsApproved : boolean
  CorporateIFSC : string
  BankId : number
  Bank :any
  Employees : IEmployee[]

}

export interface IEmployee{
  EmployeeId : number
  FullName : string
  Email : string
  Salary : number
  Status : string
  CorporateId : number
  
}

export interface Ibank{
  BankId : number
  BankName : string
  BankEmail : string
  Password : string
  BankIFSC : string
   BankCity : string
   BankState : string
   BranchName : string
   BankContact : string
   BankLicenseNumber : number
   BankManagerName : string
  Role : string
  IsApproved :boolean
  Corporates: ICorporate[]
 
}

export interface IBeneficiary{
 BeneficiaryId : number,
  BeneficiaryName : string,
  AccountNumber : number,
  Status  : string,
  BeneficiaryEmail : string,
  CorporateId:number,
  Balance : number,
  BenificiaryIFSC : string
}

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private userSubject: BehaviorSubject<string | null>;
  public userToken: Observable<string | null>;
  private readonly TOKEN_KEY = 'token'; // Avoid hardcoding token key
  baseUrl = 'http://localhost:5223/api';
 
  constructor(private httpClient: HttpClient, private router: Router,private jwtHelper: JwtHelperService) 
  {
    const storedToken = localStorage.getItem(this.TOKEN_KEY);
    this.userSubject = new BehaviorSubject<string | null>(storedToken);
    this.userToken = this.userSubject.asObservable();
  }
 
  login(data: { email: string; password: string }): Observable<any> {
    const url = `${this.baseUrl}/Auth/login`;
    return this.httpClient.post(url, data, { responseType: 'text' }).pipe(
      map((response: string) => {
        this.setToken(response); 
        console.log("new token", response);
        
        return response;
      }),
      catchError(this.handleError) 
    );
  }

  public getUnregisteredBanks():Observable<Ibank[]>{
    let dataUrl = `${this.baseUrl}/SuperAdmin/UnregisteredBanks`;
    return this.httpClient.get<Ibank[]>(dataUrl).pipe(catchError(this.handleError));
  }
 
  public getUnregisteredCorporate():Observable<ICorporate[]>{
    let dataUrl = `${this.baseUrl}/SuperAdmin/UnregisteredCorporate`;
    return this.httpClient.get<ICorporate[]>(dataUrl).pipe(catchError(this.handleError));
  }

  public getBanks():Observable<Ibank[]>{
    let dataUrl = `${this.baseUrl}/SuperAdmin/Banks`;
    return this.httpClient.get<Ibank[]>(dataUrl).pipe(catchError(this.handleError));
  }

  public getCorporates():Observable<ICorporate[]>{
    let dataUrl = `${this.baseUrl}/SuperAdmin/Corporates`;
    return this.httpClient.get<ICorporate[]>(dataUrl).pipe(catchError(this.handleError));
  }

  public getPaymentRequests():Observable<IEmployee[]>{
    let dataUrl = `${this.baseUrl}/SuperAdmin/Corporate/Employees`;
    return this.httpClient.get<IEmployee[]>(dataUrl).pipe(catchError(this.handleError));

  }

  public approvePayment(employees : IEmployee[]):Observable<{}>{
    let dataUrl = `${this.baseUrl}/SuperAdmin/Corporate/ApproveEmployees`;
    return this.httpClient.put<{}>(dataUrl, employees).pipe(catchError(this.handleError))
  }

  public addCorporate(corporate: FormData): Observable<any> {
    let dataUrl = `${this.baseUrl}/Auth/RegisterCorporate`;
    return this.httpClient.post<{}>(dataUrl, corporate).pipe(
      map((response: any) => {
        if (response && Object.keys(response).length > 0) {
          return response;
        } else {
          return 'Success, but no data returned';
        }
      }),
      catchError(this.handleError)
    );
  }
  

  public addBank(bank: Ibank): Observable<Ibank> {
    let dataUrl = `${this.baseUrl}/Auth/RegisterBank`;
    return this.httpClient.post<Ibank>(dataUrl, bank).pipe(catchError(this.handleError))
  }

  public approveBank(id: number, bank: Ibank): Observable<Ibank> {
    const dataUrl = `${this.baseUrl}/SuperAdmin/ApproveBank/${id}`; 
    return this.httpClient.put<Ibank>(dataUrl, bank).pipe(
      catchError(this.handleError)
    );
  }

  public approveCorporate(id: number, corporate: ICorporate): Observable<ICorporate> {
    const dataUrl = `${this.baseUrl}/SuperAdmin/ApproveCorporate/${id}`; 
    return this.httpClient.put<ICorporate>(dataUrl, corporate).pipe(catchError(this.handleError)
    );
  }

  public rejectCorporate(id : number):Observable<{}>{
    const dataUrl = `${this.baseUrl}/SuperAdmin/RejectCorporate/${id}`; 
    return this.httpClient.delete<ICorporate>(dataUrl).pipe(catchError(this.handleError))
  }

  uploadEmployeeFile(corporateId: number, file: File): Observable<any> {
    const dataUrl = `${this.baseUrl}/Client/UploadEmployees/${corporateId}`;
    
    const formData = new FormData(); 
    formData.append('file', file); 

    return this.httpClient.post(dataUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  getCorporatesById(id : number):Observable<ICorporate>{
    const dataUrl = `${this.baseUrl}/Client/GetCorporates/${id}`;
    return this.httpClient.get<ICorporate>(dataUrl).pipe(catchError(this.handleError))
  }
  getCorporateEmployeesById(id : number):Observable<ICorporate>{
    const dataUrl = `${this.baseUrl}/Client/GetCorporateEmployees/${id}`;
    return this.httpClient.get<ICorporate>(dataUrl).pipe(catchError(this.handleError))
  }

  public getBankById(id: number): Observable<{}> {
    let dataUrl = `${this.baseUrl}/Bank/GetBankById/${id}`;
    return this.httpClient.get<any>(dataUrl).pipe(catchError(this.handleError));
  }

  public getbatchpayments():Observable<any>{
    let dataUrl = `${this.baseUrl}/SuperAdmin/PaymentBatch`;
    return this.httpClient.get<any>(dataUrl).pipe(catchError(this.handleError))
    
  }
  
  public downloadBatchPayment(): Observable<Blob> {
    let dataUrl = `${this.baseUrl}/SuperAdmin/download`;
    return this.httpClient.get(dataUrl, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }
  
  public getBeneficiary(id : number): Observable<any>{
    let dataUrl = `${this.baseUrl}/Beneficiary/GetBeneficiaryWithCorpId/${id}`;
     return this.httpClient.get(dataUrl).pipe(catchError(this.handleError));
  }

  public addBenificiary(benificiary : IBeneficiary, id : number): Observable<{}>{
    let dataUrl = `${this.baseUrl}/Beneficiary/AddBeneficiary/${id}`;
    return this.httpClient.post(dataUrl, benificiary).pipe(catchError(this.handleError));
  }

  public getBenficiaryRequests():Observable<any>{
    let dataUrl = `${this.baseUrl}/Beneficiary`;
    return this.httpClient.get(dataUrl).pipe(catchError(this.handleError));

  }

  public approveBenificiary(id : number,):Observable<any>{
    let dataUrl = `${this.baseUrl}/SuperAdmin/ApproveBeneficiary/${id}`;
    return this.httpClient.put(dataUrl, id).pipe(catchError(this.handleError));
  }

  public rejectBenificiary(id : number):Observable<any>{
    let dataUrl = `${this.baseUrl}/SuperAdmin/RejectBeneficiary/${id}`;
    return this.httpClient.put(dataUrl, id).pipe(catchError(this.handleError));
  }

  public getBenificiaryById(id:number):Observable<any>{
    let dataUrl = `${this.baseUrl}/Beneficiary/GetBeneficiaryByBenificiaryId/${id}`;
    return this.httpClient.get(dataUrl).pipe(catchError(this.handleError))

  }

  public benificiaryPayment(id: number, amount: number): Observable<{}> {
    const dataUrl = `${this.baseUrl}/Beneficiary/PaymentDone`;
    
    const paymentData = {
        Id: id,    
        Amount: amount
    };

    return this.httpClient.post(dataUrl, paymentData).pipe(
        catchError(this.handleError)
    );
}


public getEmployeeReport(): Observable<{}> {
  let dataUrl = `${this.baseUrl}/SuperAdmin/status-report`;
  return this.httpClient.get<{}>(dataUrl).pipe(catchError(this.handleError));
}


public updateCorporate(Corporate : ICorporate):Observable<{}>{
  let dataUrl = `${this.baseUrl}/SuperAdmin/UpdateCorporateData/${Corporate.CorporateId}`;
  
  return this.httpClient.put<{}>(dataUrl,Corporate).pipe(catchError(this.handleError))

}

  private setToken(token: string | null): void {
    if (token) {
      localStorage.setItem(this.TOKEN_KEY, token);
      this.userSubject.next(token);
    } else {
      this.clearToken();
    }
  }
 
  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.userSubject.next(null);
  }
 
  getUserRoles(): string[] {
    const token = this.userSubject.getValue();
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      return [];  // Return an empty array if no valid token exists
    }
  
    const decodedRoles = this.decodeRoles(token);
    return decodedRoles && decodedRoles.length > 0 ? decodedRoles : []; // Safely check decoded roles
  }
 
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    
    // Ensure that the token is valid and not expired
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }
 
  private decodeRoles(token: string | null): string[] {
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        
        // Check if 'role' is a string (single role) or an array (multiple roles)
        if (decodedToken.role) {
          return [decodedToken.role]; // Return an array with a single role
        } else if (decodedToken.roles) {
          return decodedToken.roles; // Return roles array if present
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return []; // Return empty array in case of failure
  }
  
 
  private isValidToken(token: string | null): boolean {
    if (token) {
      try {
        return !this.jwtHelper.isTokenExpired(token);
      } catch (error) {
        console.error('Error checking token expiration:', error);
        return false;
      }
    }
    return false; 
  }
 
  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  public handleError(error:HttpErrorResponse){
    let errorMessage:string='';
    if(error.error instanceof ErrorEvent){
      //client error
      errorMessage=`Error :${error.error.message}`;
    }
    else{
      //server error
      errorMessage=`Status :${error.status}`;
    }
    return throwError(errorMessage);
  }
}