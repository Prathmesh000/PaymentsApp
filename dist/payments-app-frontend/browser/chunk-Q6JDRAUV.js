import{b as n,c as u}from"./chunk-KQLASE5C.js";import{Da as c,o as s,r as i}from"./chunk-AFT7IMM4.js";var l=class o{constructor(t,e){this.authService=t;this.router=e}jwtHelper=new n;canActivate(t){let e=this.authService.isAuthenticated(),r=this.authService.getUserRoles()||[],a=t.data.expectedRoles||[];return console.log("AuthGuard: isAuthenticated:",e),console.log("AuthGuard: userRoles:",r),console.log("AuthGuard: expectedRoles:",a),e&&this.hasRole(r,a)?!0:(this.router.navigate(["/login"]),!1)}hasRole(t,e){return e.some(r=>t.includes(r))}static \u0275fac=function(e){return new(e||o)(i(u),i(c))};static \u0275prov=s({token:o,factory:o.\u0275fac,providedIn:"root"})};export{l as a};
