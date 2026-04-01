import React from 'react';
import { Box, Text } from '../../ink.js';

// Each letter: 7 chars wide, 7 rows tall
const L = [
  '██     ',
  '██     ',
  '██     ',
  '██     ',
  '██     ',
  '██     ',
  '███████',
];
const O = [
  ' █████ ',
  '██   ██',
  '██   ██',
  '██   ██',
  '██   ██',
  '██   ██',
  ' █████ ',
];
const V = [
  '██   ██',
  '██   ██',
  '██   ██',
  ' ██ ██ ',
  ' ██ ██ ',
  '  ███  ',
  '   █   ',
];
const C = [
  ' █████ ',
  '██   ██',
  '██     ',
  '██     ',
  '██     ',
  '██   ██',
  ' █████ ',
];
const D = [
  '█████  ',
  '██  ██ ',
  '██   ██',
  '██   ██',
  '██   ██',
  '██  ██ ',
  '█████  ',
];
const E = [
  '███████',
  '██     ',
  '██     ',
  '█████  ',
  '██     ',
  '██     ',
  '███████',
];

const LETTERS = [L, O, V, C, O, D, E];
const COLORS = [
  '#CC785C', // terracotta (brand)
  '#E09050', // warm orange
  '#E8B840', // amber
  '#58B868', // sage green
  '#48A8C8', // teal
  '#6878B8', // slate blue
  '#A858A0', // plum
];
const GAP = ' ';
const ROWS = 7;

export function LovcodeLogo() {
  return (
    <Box flexDirection="column" alignItems="center">
      {Array.from({ length: ROWS }, (_, row) => (
        <Text key={row}>
          {LETTERS.map((letter, i) => (
            <Text key={i} color={COLORS[i]}>
              {letter[row]}{i < LETTERS.length - 1 ? GAP : ''}
            </Text>
          ))}
        </Text>
      ))}
      <Text>{' '}</Text>
      <Text dimColor>{'  ✦  Powered by Lovstudio  ·  Special Thanks to Claude Code  ✦'}</Text>
    </Box>
  );
}
