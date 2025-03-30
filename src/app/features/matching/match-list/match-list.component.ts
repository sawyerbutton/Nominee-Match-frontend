import { Component, OnInit } from '@angular/core';
import { MatchingService } from '../../../core/services/matching.service';
import { Web3Service } from '../../../core/services/web3.service';
import { Match } from '../../../core/models/profile.model';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  matches: Match[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private matchingService: MatchingService,
    private web3Service: Web3Service
  ) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  async loadMatches(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      const account = await this.web3Service.account$.toPromise();
      if (account) {
        const result = await this.matchingService.findMatches(account).toPromise();
        this.matches = result || [];
      }
    } catch (error) {
      this.error = '加载匹配列表失败';
      console.error('Error loading matches:', error);
    } finally {
      this.loading = false;
    }
  }

  async acceptMatch(matchId: string): Promise<void> {
    try {
      await this.matchingService.acceptMatch(matchId).toPromise();
      await this.loadMatches(); // 重新加载列表
    } catch (error) {
      console.error('Error accepting match:', error);
      this.error = '接受匹配失败';
    }
  }

  async rejectMatch(matchId: string): Promise<void> {
    try {
      await this.matchingService.rejectMatch(matchId).toPromise();
      await this.loadMatches(); // 重新加载列表
    } catch (error) {
      console.error('Error rejecting match:', error);
      this.error = '拒绝匹配失败';
    }
  }
}
