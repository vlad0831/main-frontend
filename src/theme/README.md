# How to use Themes

Theming refers to the customization of your UI/UX Design app to better reflect your product's brand.

## Description

Basically we have `light` and `dark` themes but it is designed for applying various themes very easily by customizing `default(light or dark)` theme. We defined the `colors`, `fontSizes`, `lineHeights`, `metrics`, `radiis`, `spaces`, and `typography` with the values which should be used in the app.

## Getting Started

### Dependencies

- [styeld-components](https://styled-components.com/)
- [styeld-system](https://styled-system.com/)
- [styled-map](https://github.com/scf4/styled-map)

### Structure

```
theme
├── themes
│   ├── light                 # light theme
│   │   │
│   │   ├── colors.ts         # Define light colors
│   │   ├── fontSizes.ts      # Define font sizes
│   │   ├── lineHeights.ts    # Define text line heights
│   │   ├── metrics.ts        # Define metrics(e.g. iPhoneX metrics)
│   │   ├── radiis.ts         # Define border radius
│   │   ├── spaces.ts         # Define generic padding, margin
│   │   └── typography.ts     # Define font family, style
│   │
│   ├── dark                  # dark theme
│   └── ...                   # more themes ...
│
├── helpers.ts                # Functions to apply themes
├── rules.ts                  # Custom functions for
└── ...                       # etc...
```

### Examples

```js
export const Container = styled(View).attrs((props) => ({
  bg: 'white', // from colors.ts
  px: 'sm', // from spacing.ts
  height: getMetrics('appBarHeight')(props), // getMetrics helper should let you get `appBarHeight` metric from metrics.ts
}))``
```
