import{o as I,p as N}from"./chunk-PIVF7N2L.js";import{a as c,b as w,c as y}from"./chunk-KQLASE5C.js";import{Aa as R,Ca as b,Fa as s,P as M,k as u,l as f,o as h,p as i,r as g,t as v,u as n,xa as C,ya as A,za as H}from"./chunk-AFT7IMM4.js";import"./chunk-AIZVJUQQ.js";var S=[{path:"",redirectTo:"/landing-page",pathMatch:"full"},{path:"landing-page",loadChildren:()=>import("./chunk-EBBY6P6H.js").then(t=>t.LandingPageModule)},{path:"login",loadChildren:()=>import("./chunk-GQANE7TA.js").then(t=>t.LoginPageModule)},{path:"register",loadChildren:()=>import("./chunk-BOSLCY7L.js").then(t=>t.RegisterModule)},{path:"admin",loadChildren:()=>import("./chunk-ILJUGEP4.js").then(t=>t.AdminModule)},{path:"bank",loadChildren:()=>import("./chunk-IIWB7QOR.js").then(t=>t.BankModule)},{path:"corporate",loadChildren:()=>import("./chunk-TUQVK3YR.js").then(t=>t.CorporateModule)},{path:"**",redirectTo:"/login"}],p=class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=n({type:t});static \u0275inj=i({imports:[s.forRoot(S),s]})};var a=class t{title="PaymentsAppFrontend";static \u0275fac=function(o){return new(o||t)};static \u0275cmp=v({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(o,r){o&1&&M(0,"router-outlet")},dependencies:[b]})};var m=class t{constructor(e){this.authService=e}intercept(e,o){return console.log("Request intercepted:",e.url),this.authService.userToken.pipe(u(1),f(r=>{let T=e.url.startsWith("http://localhost:5223");return r&&T&&(console.log("Attaching token:",r),e=e.clone({setHeaders:{Authorization:`Bearer ${r}`}})),o.handle(e)}))}static \u0275fac=function(o){return new(o||t)(g(y))};static \u0275prov=h({token:t,factory:t.\u0275fac})};var l=class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=n({type:t,bootstrap:[a]});static \u0275inj=i({providers:[{provide:c,useValue:c},{provide:C,useClass:m,multi:!0},w],imports:[R,p,I,A,N]})};H().bootstrapModule(l,{ngZoneEventCoalescing:!0}).catch(t=>console.error(t));