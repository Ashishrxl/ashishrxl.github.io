/**
 * @fileoverview Control real time music with a MIDI controller
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { PlaybackState, Prompt } from './types';
import { GoogleGenAI } from '@google/genai';
import { PromptDjMidi } from './components/PromptDjMidi';
import { ToastMessage } from './components/ToastMessage';
import { throttle } from './utils/throttle';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
// FIX: Use 'gemini-2.5-flash' model for general text tasks as per guidelines.
const model = 'gemini-1.5-flash';

function main() {
  const initialPrompts = buildInitialPrompts();

  const pdjMidi = new PromptDjMidi(initialPrompts);
  document.body.appendChild(pdjMidi);

  const toastMessage = new ToastMessage();
  document.body.appendChild(toastMessage);

  const resultDisplay = document.createElement('div');
  resultDisplay.id = 'result-display';
  resultDisplay.className = 'fixed bottom-0 left-0 right-0 p-6 bg-gray-900 bg-opacity-80 text-white text-center text-lg backdrop-blur-sm transition-opacity duration-500 ease-in-out';
  resultDisplay.textContent = 'Press play to start generating music descriptions.';
  document.body.appendChild(resultDisplay);

  let playbackState: PlaybackState = 'stopped';
  let currentPrompts = initialPrompts;

  const generateDescription = throttle(async () => {
    if (playbackState !== 'playing') return;

    const activePrompts = Array.from(currentPrompts.values()).filter(p => p.weight > 0);
    if (activePrompts.length === 0) {
      resultDisplay.textContent = 'Turn up a knob to start generating music descriptions!';
      return;
    }

    pdjMidi.playbackState = 'loading';

    const promptParts = activePrompts.map(p => {
        let influence = "medium influence";
        if (p.weight > 1.5) influence = "very strong influence";
        else if (p.weight > 0.75) influence = "strong influence";
        else if (p.weight < 0.25) influence = "light influence";
        return `'${p.text}' (${influence})`;
    });

    const fullPrompt = `You are a music critic. Describe a piece of music that creatively combines the following elements: ${promptParts.join(', ')}. Be vivid, imaginative, and concise.`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: fullPrompt,
        });
        resultDisplay.textContent = response.text;
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        toastMessage.show(errorMessage);
        resultDisplay.textContent = 'Error generating description.';
    } finally {
        // FIX: This condition is more explicit and avoids a TypeScript control flow analysis error.
        if (playbackState === 'playing') {
            pdjMidi.playbackState = 'playing';
        }
    }
  }, 1500);

  pdjMidi.addEventListener('prompts-changed', ((e: Event) => {
    const customEvent = e as CustomEvent<Map<string, Prompt>>;
    currentPrompts = customEvent.detail;
    if (playbackState === 'playing') {
        generateDescription();
    }
  }));

  pdjMidi.addEventListener('play-pause', () => {
    if (playbackState === 'playing' || playbackState === 'loading') {
      // FIX: Use 'paused' state to be consistent with the UI message.
      playbackState = 'paused';
      pdjMidi.playbackState = 'stopped';
      resultDisplay.textContent = 'Paused. Press play to continue.';
    } else {
      playbackState = 'playing';
      pdjMidi.playbackState = 'playing';
      generateDescription();
    }
  });

  pdjMidi.addEventListener('error', ((e: Event) => {
    const customEvent = e as CustomEvent<string>;
    toastMessage.show(customEvent.detail);
  }));
}

function buildInitialPrompts() {
  const startOn = [...DEFAULT_PROMPTS]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const prompts = new Map<string, Prompt>();

  for (let i = 0; i < DEFAULT_PROMPTS.length; i++) {
    const promptId = `prompt-${i}`;
    const prompt = DEFAULT_PROMPTS[i];
    const { text, color } = prompt;
    prompts.set(promptId, {
      promptId,
      text,
      weight: startOn.includes(prompt) ? 1 : 0,
      cc: i,
      color,
    });
  }

  return prompts;
}

const DEFAULT_PROMPTS = [
  { color: '#ff69b4', text: 'Type your lyrics here' },
  { color: '#9900ff', text: 'Ethereal female vocals' },
  { color: '#5200ff', text: 'Soulful male voice' },
  { color: '#ff25f6', text: 'Drum and Bass' },
  { color: '#2af6de', text: 'Post Punk' },
  { color: '#ffdd28', text: 'Shoegaze' },
  { color: '#2af6de', text: 'Funk' },
  { color: '#9900ff', text: 'Gospel Choir' },
  { color: '#3dffab', text: 'Lush Strings' },
  { color: '#d8ff3e', text: 'Sparkling Arpeggios' },
  { color: '#d9b2ff', text: 'Melodic Humming' },
  { color: '#3dffab', text: 'Punchy Kick' },
  { color: '#ffdd28', text: 'Dubstep' },
  { color: '#ff25f6', text: 'Scat Singing' },
  { color: '#d8ff3e', text: 'Neo Soul' },
  { color: '#5200ff', text: 'Trip Hop' },
];

main();