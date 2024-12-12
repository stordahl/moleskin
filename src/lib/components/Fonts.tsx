import { FC } from 'hono/jsx'
import type { Font } from '../config/schemas'

export const Fonts: FC<Font> = ({ google }) => {
  return (
    <>
      {google.map(({}) => {
        return (
          <link 
            href={`https://fonts.googleapis.com/css?family=${buildGoogleFontParams(google)}`} 
            rel="stylesheet"
          />
        )
      })}
    </>
  )
}

function buildGoogleFontParams(config: Font["google"]) {
  return config
    .flatMap(font => {
      // Replace spaces with plus signs
      const formattedName = font.name.replace(/\s+/g, '+');
      
      // If no styles, return the font name
      if (font.styles?.length === 0) {
        return [formattedName];
      }
      
      // Create an instance of the font for each style
      return [
        formattedName,
        ...[...font.styles ?? []].map(style => {
          if (style === 'italic') return `${formattedName}:italic`;
          if (style === 'bold') return `${formattedName}:bold`;
          return formattedName;
        })
      ];
    })
    .join('|');
}

