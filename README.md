# React-Synth

Why code a synthesizer?

..Why not? I have a fascination with synthesisers and believe that the best songs in the world were created by these. As a practicing Music Technologist during my schooling days, i had put in some research in how these instruments work. Now i get to combine my previous knowledge with the skills garnered on my software developer course, and that sounds like a lot of fun to me. So i'll try and keep this readme updated to reference my ongoing work developing a synthesizer with the React Framework. How exciting!

## DAY 1

I have put together a repository to work on. I have initialised the repository and got to work. First comes the play button to allow the Web Audio API to play a simple tone when it's clicked on. It has a static timer of 2 seconds and will be changed in future to allow an adsr envelope to shape the dynamics.

Next i have created some simple buttons that react with usestate to change the type of my oscillator. It can now play sine, saw, tri and square waves.
I didnt enjoy the use of buttons and thought it might be a better option to create a slider instead.

## DAY 2

I've decided to use tailwindcss for the styling of my project. I want the look of my application to be like a synthesizer so i'm going to research this further. 

I want to make this synth function like a minimoog synthesizer. Though it won't be exact i'll ttry to be as close as possible

I want Six seperate components to make up the UI of the minimoog.

  - Controllers
    - Master Tuner
    - Glide

<br>

  - Oscilators
    - Octave Select
    - Fine Tuner
    - Three usable oscillators banks with six oscilator types to choose from

<br>

  - Mix (Combine)
    - Three seperate volume controls
    - Mute / Unmute

<br>

  - Filter
    - HPF with q control (emphasis)
    -(there is also a parameter to control a filter envelope that i may code at a later date)

<br>

  - ADSR Envelope
    - Attack Decay and Sustain controls. The reason the release is knob isnt neccesary is because its value is married to the decays position 
  - Master 
    - Volume

<br>

I've made a mockup of what i actually want it to look like. ***See mockup-synth.jpg in github repository***.

DAY 3

On the previous day, it was only to set the goal to be able to learn more of the intricacies of the web audio api and it's capabilities. I know there will be some more complicated content to learn on the way, so there will be some extensive research involved.

I have developed a onscreen keyboard using basic stylings using divs and borders. When each key is clicked i want the correct frequency to playback from the api. Each note on a piano has a frequency with a middle A of 440hz. I will use an NOTES object of key value pairs with notes and frequencies. 

A minimoog has 41 keys that range from F0 - C4.

A mathematical equation can be used for working out each frequency. 

**fn = f0 * (a)(n)**

**fn** is the frequency of the note n semitones away (from middle A).

**f0** is the frequency of a fixed note (using middle A).

**a** is 2^1/12 which equals 0.16666666666... recurring.

**n** is the number of semitones away from the fixed note (which is A4)

Let's use middle A (A4) of 440hz to suit this equation and get the value of A5.

f(12) = 440 x (2^(1/12))^12 = 880hz - OCTAVE
f(16) = 440 * (2^(1/12))^16 = 1108.73052391...Hz - OCTAVE + 4

I will create a js function which works this out.

The formula now works but i need to work out how to use it with the key range of my minimoog. My formula starts with a A-4, but i need F-0 to C-4. This means that i need 52 semitones lower that 440 Hz to get the correct default. There are also 44 keys on a minimoog.

LO = -52, -9
32 = -40
16 = -28
8 = -16
4 = -4
2 = 8

DAY 5

### Developing a knob

I have create an intractive knob to use the parameter of my synth. I wanted it to have similar feel to the original analog classic. A lot of maths is involved to make this work. You can get a full range knob to work with parameters that need a sweeping value (like a volume knob) and a stepper knob that can select between different values. The amount of degrees can be set using the *degrees* atribute and the type of dial can be select via the *type* attribute.

type => "fullRange"|| n (number)
degrees => 0 - 360 (number)

### making computer keyboard work with audio web api

I have created some code to use the keyboard using event listeners  on key down and up events. I have an issue where the audio cuts after after too many presses are made consecutively. I hope to sort this bug out soon.

I managed to get my synth to have both onscreen and computer keyboard to play notes together using the same audio context api.