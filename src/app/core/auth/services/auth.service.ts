import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, BehaviorSubject, tap, of, switchMap} from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string;
  is_active: boolean;
  is_admin: boolean;
}

// Interface para a resposta do token da sua API
interface TokenResponse {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'http://localhost:8000/api/v1/auth'; // URL base de autenticação
  private tokenKey = 'auth_token'; // Chave para salvar no localStorage

  // BehaviorSubject para rastrear o estado de autenticação em tempo real
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();


  constructor() {
    if (this.hasToken()) {
      this.getMe().subscribe();
    }
  }

  getMe(): Observable<User | null> {
    if (!this.hasToken()) {
      return of(null);
    }
    return this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
      })
    );
  }

  login(credentials: FormData): Observable<User | null> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, credentials).pipe(
      // Primeiro, salvamos o token
      tap(response => {
        this.saveToken(response.access_token);
        this.isAuthenticatedSubject.next(true);
      }),
      // Em seguida, usamos o switchMap para MUDAR para a chamada que busca o usuário
      switchMap(() => this.getMe())
    );
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null); // Limpa os dados do usuário ao sair
    this.router.navigate(['/login']);
  }
}
