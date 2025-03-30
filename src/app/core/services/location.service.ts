import { Injectable } from '@angular/core';
import { Location } from '../models/profile.model';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor() {}

  getCurrentLocation(): Observable<Location> {
    return from(
      new Promise<Location>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by your browser'));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const address = await this.getAddressFromCoordinates(latitude, longitude);
              resolve({
                latitude,
                longitude,
                ...address
              });
            } catch (error) {
              reject(error);
            }
          },
          (error) => {
            reject(error);
          }
        );
      })
    );
  }

  private async getAddressFromCoordinates(latitude: number, longitude: number): Promise<{ address: string; city: string; country: string }> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      return {
        address: data.display_name,
        city: data.address.city || data.address.town || data.address.village || '',
        country: data.address.country || ''
      };
    } catch (error) {
      console.error('Error getting address:', error);
      return {
        address: '',
        city: '',
        country: ''
      };
    }
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // 地球半径（公里）
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(value: number): number {
    return (value * Math.PI) / 180;
  }
}
