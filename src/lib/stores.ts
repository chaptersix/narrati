// src/lib/stores.ts
import { writable } from 'svelte/store';

export const sentences = writable<string[]>([]);
export const currentIndex = writable<number>(0);
export const isReading = writable<boolean>(false);
