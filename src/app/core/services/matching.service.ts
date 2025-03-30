import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match, Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class MatchingService {
  private apiUrl = 'http://localhost:3000/api'; // 替换为实际的后端API地址

  constructor(private http: HttpClient) {}

  findMatches(profileId: string): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/matches/${profileId}`);
  }

  getMatchDetails(matchId: string): Observable<{
    match: Match;
    matchedProfile: Profile;
  }> {
    return this.http.get<{
      match: Match;
      matchedProfile: Profile;
    }>(`${this.apiUrl}/matches/${matchId}/details`);
  }

  acceptMatch(matchId: string): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrl}/matches/${matchId}/accept`, {});
  }

  rejectMatch(matchId: string): Observable<Match> {
    return this.http.post<Match>(`${this.apiUrl}/matches/${matchId}/reject`, {});
  }
}
