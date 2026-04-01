import React from 'react';
import { Box, Text, useTheme } from 'src/ink.js';

const WELCOME_V2_WIDTH = 58;

// "LOVCODE" in 3-row block style, 40 chars wide
const LOGO_LINES = [
  '█     ████  █  █  ████  ████  ███   ████',
  '█     █  █  █  █  █     █  █  █  █  █   ',
  '████  ████   ██   ████  ████  ███   ████',
];
const LOGO_WIDTH = 41;
const PAD = Math.floor((WELCOME_V2_WIDTH - LOGO_WIDTH) / 2);
const LOGO_PAD = ' '.repeat(PAD);

export function WelcomeV2() {
  const [theme] = useTheme();
  const isLight = ['light', 'light-daltonized', 'light-ansi'].includes(theme);
  const dim = '……………………………………………………………………………………………………………………………………………………………………………………………………………………'.slice(0, WELCOME_V2_WIDTH);

  return (
    <Box width={WELCOME_V2_WIDTH} flexDirection="column">
      <Text>
        <Text color="claude">{'Welcome to Lovcode CLI'} </Text>
        <Text dimColor>v{MACRO.VERSION} </Text>
      </Text>
      <Text>{dim}</Text>
      <Text>{' '}</Text>
      {!isLight && <Text dimColor>{'     *                                            *   '}</Text>}
      <Text>{' '}</Text>
      {LOGO_LINES.map((line, i) => (
        <Text key={i}>
          <Text>{LOGO_PAD}</Text>
          <Text color="claude">{line}</Text>
        </Text>
      ))}
      <Text>{' '}</Text>
      <Text dimColor>{'                    ·  AI Coding  ·                       '.slice(0, WELCOME_V2_WIDTH)}</Text>
      {!isLight && <Text dimColor>{'                                                *         '.slice(0, WELCOME_V2_WIDTH)}</Text>}
      <Text>{dim}</Text>
    </Box>
  );
}
