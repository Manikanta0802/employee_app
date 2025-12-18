import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = `/api`;
  private tokenKey = 'ea_token';
  private roleKey = 'ea_role';

  currentUser$ = new BehaviorSubject<AuthResponse | null>(null);

  constructor(private http: HttpClient) {
    const token = this.getToken();
    const role = this.getRole();

    if (token && role) {
      this.currentUser$.next({ token, role });
    }
  }

  login(data: { email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data)
      .pipe(tap(res => this.setSession(res)));
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data)
      .pipe(tap(res => this.setSession(res)));
  }

  private setSession(res: AuthResponse) {
    localStorage.setItem(this.tokenKey, res.token);
    localStorage.setItem(this.roleKey, res.role);
    this.currentUser$.next(res);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): 'EMPLOYEE' | 'MANAGER' | 'ADMIN' | null {
    return localStorage.getItem(this.roleKey) as any;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(role: 'EMPLOYEE' | 'MANAGER' | 'ADMIN'): boolean {
    return this.getRole() === role;
  }

  logout() {
    localStorage.clear();
    this.currentUser$.next(null);
  }
}
