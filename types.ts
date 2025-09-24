/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export interface Prompt {
  readonly promptId: string;
  text: string;
  weight: number;
  cc: number;
  color: string;
}

export interface ControlChange {
  channel: number;
  cc: number;
  value: number;
}

// FIX: Added 'paused' to the possible playback states.
export type PlaybackState = 'stopped' | 'playing' | 'loading' | 'paused';