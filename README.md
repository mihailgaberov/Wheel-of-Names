# Wheel of Names

## Build Your Own Wheel of Names

This will be an app that I presume is inspired by the TV show Wheel of Fortune. In the TV show, contestants try to figure out a short phrase by guessing letters. If they guess correctly, the letter will be revealed. They spin the wheel to determine how much money each correct letter is worth.

![Wheel of Names](https://prod-files-secure.s3.us-west-2.amazonaws.com/f89f3b4e-feff-46be-862b-b444d4501857/c2612bdf-2242-4b28-9991-6be72d52e1cf/wheel-of-fortune.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20241023%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20241023T151222Z&X-Amz-Expires=3600&X-Amz-Signature=407efe7f4d771da8a88a8773d90d7f2ec10b56bbec53ac5b9bb0279b10388ac6&X-Amz-SignedHeaders=host&x-id=GetObject)

Wheel of Names is similar, but allows us to create a virtual wheel, putting our own names on it. We can then virtually spin it to determine a winner.
> _I have written a tutorial about how I did this. You can find it [here](https://www.mihailgaberov.com/build-your-own-wheel-of-names) or [here](https://www.freecodecamp.org/news/build-your-own-wheel-of-names)._

<hr />

## Tech stack

- Bun / Vite
- React / Typescript
- SASS / styled-components
- canvas / canvas-confetti

### Screenshots

![Initial screen](https://github.com/mihailgaberov/Wheel-of-Names/blob/main/screenshots/initial-screen.png)

![Entering question](https://github.com/mihailgaberov/Wheel-of-Names/blob/main/screenshots/entering-question.png)

![Entering participants](https://github.com/mihailgaberov/Wheel-of-Names/blob/main/screenshots/entering-participants.png)

### Videos

[![Winner](https://img.youtube.com/vi/sugUnci1Rlw/mqdefault.jpg)](https://youtu.be/sugUnci1Rlw)

[![Winner](https://img.youtube.com/vi/gIc6wtH9fK8/mqdefault.jpg)](https://youtu.be/gIc6wtH9fK8)

## Application features:

### I. Question

1. This is where users can submit a question or phrase that will determine the focus of the spins.
2. Any changes made in the input field are saved when the user clicks outside of it (on focus out).

### II. Wheel

1. The wheel component spins with an easing animation and determines the winner.
2. The spin direction can be adjusted using the buttons, for either clockwise or counterclockwise rotation.
3. Each adjacent sector is uniquely colored, and their sizes are calculated proportionally to the number of participants.

### III. Add Participants

1. The participant entry area includes an input field for entering a participant's name and an 'ADD' button to add it to the participants list.
2. To add participants more quickly, the user can press the ENTER key on the keyboard.

### IV. Participants List

1. This section displays all the participants' names.
2. The list offers options to sort the names alphabetically or shuffle them randomly, with both actions dynamically updating the wheel component.

### Demo

:star: [Wheel of Names](https://wheel-of-names-three.vercel.app//) :star:

### Running the app locally

To run the app, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed.
2. Install [bun](https://bun.sh/docs/installation).
3. From the project folder, execute the following commands:

To install dependencies:

```shell
  bun install
```

To run the app:

```shell
  bun run dev
```

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=mihailgaberov/Wheel-of-Names&type=Date)](https://star-history.com/#mihailgaberov/Wheel-of-Names&Date)
