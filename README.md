# Pico y Placa Predictor

A custom CLI to predict Quito's Pico y Placa restrictions. It was done with Typescript to implement and practice DDD best practices.

A car that is restricted from circulation must meet all the following criteria:

- The last digit of its licence plate is:
  - Monday: 1,2.
  - Tuesday: 3,4.
  - Wendnesday: 5,6.
  - Thursday: 7,8.
  - Friday: 9,0.
  - Saturday: No restrictions.
  - Sunday: No restrictions.
- The circulation time matches time from 7:00 to 9:30 and from 16:00 to 19:30.

## Requirements

Node >=8.0.0

## Instalation

### Option 1: npx installation

```
$ npx pico-placa
```

### Option 2: npm global installation

```
$ npm i -g pico-placa
```

## Usage

To predict if the car can be on the road or not the CLI will ask for the car's licence plate, and the date and time of circulation.

### Option 1: Execute command with flags

```
$ pico-placa --plate ABG-8234 --date 2020-05-04 --time 20:45
```

![Command using flags](https://drive.google.com/uc?id=1zaWNfyGukp5FjIz7Lxh3TCrjkVQnLiXR)

### Opction2: Execute command without flags

```
$ pico-placa
```

The following questions will be prompted.

![Questions to be prompted](https://drive.google.com/uc?id=12L9XIi43Q_Dx714e9UEZlR4XFdN7G2HZ)

## Results

Results will be shown in a **red background** if the car can't be on the road or in a **green background** if the car can be on the road.

![Result with red background](https://drive.google.com/uc?id=1j_Esv6HnK9e8BtnEPyla81vXEOXD7QE2)

![Result with green background](https://drive.google.com/uc?id=1X3iE2l7pjx7GGHMBMWcR20PGx1gbHesN)

## To run tests

- Clone or fork project from [Github](https://github.com/SerotoninaAbad/pico-placa)

```
  $ npm install
  $ npm test
```

## To run project from code

- Clone or fork project from [Github](https://github.com/SerotoninaAbad/pico-placa)

```
  $ npm install
  $ ./bin/run
```
