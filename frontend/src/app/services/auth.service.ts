import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `/api`;
  private tokenKey = 'ea_token';

  currentUser$ = new BehaviorSubject<AuthResponse | null>(null);

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      // We don't decode here; backend is source of truth.
      this.currentUser$.next(null);
    }
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data)
      .pipe(
        tap(res => this.setSession(res))
      );
  }

  login(data: { email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data)
      .pipe(
        tap(res => this.setSession(res))
      );
  }

  private setSession(res: AuthResponse) {
    localStorage.setItem(this.tokenKey, res.token);
    this.currentUser$.next(res);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUser$.next(null);
  }
}
