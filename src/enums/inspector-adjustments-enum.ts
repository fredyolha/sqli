export const locatorsThatIuse = {
    BRIGHTNESS: 'input[name="effect\/adjustments\/brightness"]',
    SATURATION: 'input[name="effect\/adjustments\/saturation"]',
    CONTRAST: 'input[name="effect\/adjustments\/contrast"]',
    GAMMA: 'input[name="effect\/adjustments\/gamma"]',
    CLARITY: 'input[name="effect\/adjustments\/clarity"]',
} as const;

// was initially an enum... just didn't work :)