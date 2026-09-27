import type { Question } from '../../types';
import { STATEMENT_OPTIONS, ST } from '../shared';

const t = String.raw;

/**
 * Mock 3 (Anvil) — Physics.
 * 27 questions, 40 minutes, no calculator; g = 10 N kg⁻¹. A second realistic
 * paper with a different topic balance from Mock 2, pitched a little above
 * real difficulty.
 */
export const PH: Question[] = [
  {
    id: '3-PH-01',
    module: 'PH',
    n: 1,
    topic: 'P6',
    spec: ['P6.5a', 'P6.5c', 'P6.1h'],
    title: 'Wavelength of a radio station',
    difficulty: 1,
    time: 60,
    stem: t`A radio station broadcasts at a frequency of 100 MHz. Radio waves travel at $3.0 \times 10^8\ \text{m s}^{-1}$.

What is the wavelength of the radio waves?`,
    options: [t`0.33 m`, t`3.0 m`, t`30 m`, t`300 m`, t`3000 m`, t`$3.0 \times 10^{16}$ m`],
    answer: 1,
    hints: [t`1 MHz is $10^6$ Hz.`],
    solution: t`$100\ \text{MHz} = 100 \times 10^6\ \text{Hz} = 1.0 \times 10^8\ \text{Hz}$, so
$$\lambda = \frac{v}{f} = \frac{3.0 \times 10^8}{1.0 \times 10^8} = 3.0\ \text{m}.$$`,
    traps: {
      0: t`Divides the frequency by the speed; $\lambda = \dfrac{v}{f}$.`,
      2: t`Takes 100 MHz as $10^7$ Hz; the prefix M means $10^6$, so 100 MHz is $10^8$ Hz.`,
      3: t`Takes 100 MHz as $10^6$ Hz; the prefix M means $10^6$, so 100 MHz is $10^8$ Hz.`,
      5: t`Multiplies the speed by the frequency.`,
    },
    insight: t`Convert prefixes first (M = $10^6$), then use $v = f\lambda$. All electromagnetic waves travel at $3.0 \times 10^8\ \text{m s}^{-1}$ in a vacuum.`,
    skills: ['wave equation', 'electromagnetic spectrum', 'unit prefixes'],
  },
  {
    id: '3-PH-02',
    module: 'PH',
    n: 2,
    topic: 'P5',
    spec: ['P5.4b', 'P5.4a'],
    title: 'Density of a stone by displacement',
    difficulty: 1,
    time: 65,
    stem: t`To find the density of a small stone, a student pours water into a measuring cylinder, which then reads $60\ \text{cm}^3$. She lowers the stone, of mass 150 g, into the water, and the reading rises to $120\ \text{cm}^3$.

What is the density of the stone?`,
    options: [t`$2.5\ \text{kg m}^{-3}$`, t`$250\ \text{kg m}^{-3}$`, t`$400\ \text{kg m}^{-3}$`, t`$1250\ \text{kg m}^{-3}$`, t`$2500\ \text{kg m}^{-3}$`, t`$25\,000\ \text{kg m}^{-3}$`],
    answer: 4,
    hints: [t`The stone's volume is the rise in the water level.`, t`$1\ \text{g cm}^{-3} = 1000\ \text{kg m}^{-3}$.`],
    solution: t`The stone pushes aside its own volume of water, so its volume is the rise in the reading:
$$V = 120 - 60 = 60\ \text{cm}^3.$$

Its density is
$$\rho = \frac{m}{V} = \frac{150\ \text{g}}{60\ \text{cm}^3} = 2.5\ \text{g cm}^{-3} = 2500\ \text{kg m}^{-3},$$
since $1\ \text{g cm}^{-3} = 1000\ \text{kg m}^{-3}$. (That is denser than water, $1000\ \text{kg m}^{-3}$, as expected for rock.)`,
    traps: {
      0: t`$2.5$ is the density in $\text{g cm}^{-3}$; it must be multiplied by 1000 to give $\text{kg m}^{-3}$.`,
      3: t`Uses the final reading, $120\ \text{cm}^3$, as the stone's volume; that includes the water.`,
      2: t`Divides the volume by the mass instead of the mass by the volume.`,
    },
    insight: t`Displacement measures the volume of an irregular solid. Remember $1\ \text{g cm}^{-3} = 1000\ \text{kg m}^{-3}$.`,
    skills: ['density', 'measuring volume', 'unit conversion'],
  },
  {
    id: '3-PH-03',
    module: 'PH',
    n: 3,
    topic: 'P6',
    spec: ['P6.4a', 'P6.4b', 'P6.4c', 'P6.2e'],
    title: 'Loudness, pitch and a passing siren',
    difficulty: 2,
    time: 75,
    stem: t`Consider the following statements about sound.`,
    statements: [
      t`Sound is produced by vibrating objects, and it cannot travel through a vacuum.`,
      t`If a note becomes louder without changing its pitch, the amplitude of the sound wave increases but its frequency stays the same.`,
      t`As an ambulance moves away from you, its siren sounds higher-pitched than when the ambulance is stationary, because the waves behind it are stretched out.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s12,
    hints: [t`Stretched-out waves have a longer wavelength. What does that do to the frequency you hear?`],
    solution: t`**Statement 1.** True: sound is passed on by particles vibrating. A vacuum has no particles, so sound cannot cross it. ✓

**Statement 2.** True: loudness depends on amplitude and pitch depends on frequency. ✓

**Statement 3.** False. Behind a moving source the waves are stretched out, so the wavelength is longer and the frequency heard is **lower**: the siren sounds lower-pitched as the ambulance moves away (and higher-pitched as it approaches). This is the Doppler effect. ✗

Statements 1 and 2 only.`,
    traps: {
      [ST.all]: t`Stretched-out waves have a longer wavelength and a *lower* frequency, so the siren sounds lower as it moves away.`,
      [ST.s1]: t`Statement 2 is also true: loudness is linked to amplitude and pitch to frequency.`,
    },
    insight: t`Loudness ↔ amplitude, pitch ↔ frequency. Doppler: an approaching source sounds higher, a receding one lower.`,
    skills: ['sound', 'amplitude and frequency', 'Doppler effect'],
  },
  {
    id: '3-PH-04',
    module: 'PH',
    n: 4,
    topic: 'P3',
    spec: ['P3.4c', 'P3.2d', 'P3.1d'],
    title: 'Driving force of an accelerating car',
    difficulty: 2,
    time: 75,
    stem: t`A car of mass 1200 kg accelerates uniformly from rest to $20\ \text{m s}^{-1}$ in 8.0 s along a straight, level road. Throughout this time the total resistive force on the car is 600 N.

What driving force does the engine provide?`,
    options: [t`2400 N`, t`3000 N`, t`3600 N`, t`4200 N`, t`9600 N`, t`24 000 N`],
    answer: 2,
    hints: [t`Find the acceleration, then the resultant force; the driving force must also overcome the resistance.`],
    solution: t`The acceleration is
$$a = \frac{\Delta v}{t} = \frac{20}{8.0} = 2.5\ \text{m s}^{-2},$$
so the resultant force is $F = ma = 1200 \times 2.5 = 3000$ N forwards.

The resultant force is the driving force minus the resistive force:
$$F_\text{drive} - 600 = 3000 \quad\Rightarrow\quad F_\text{drive} = 3600\ \text{N}.$$`,
    traps: {
      1: t`3000 N is the *resultant* force; the engine must also overcome the 600 N resistive force.`,
      0: t`Subtracts the resistive force instead of adding it.`,
      4: t`Uses the time, 8.0 s, as if it were the acceleration.`,
      5: t`Multiplies the mass by the final speed; that gives momentum, not force.`,
    },
    insight: t`$F = ma$ uses the *resultant* force. When there is resistance, driving force = $ma$ + resistive force.`,
    skills: ["Newton's second law", 'resultant force', 'acceleration'],
  },
  {
    id: '3-PH-05',
    module: 'PH',
    n: 5,
    topic: 'P3',
    spec: ['P3.6a', 'P3.6b'],
    title: 'Recoil of a skateboarder',
    difficulty: 2,
    time: 75,
    stem: t`A skateboarder of mass 60 kg stands at rest on a skateboard of mass 5.0 kg, holding a ball of mass 1.5 kg. She throws the ball horizontally forwards at $13\ \text{m s}^{-1}$.

At what speed do she and the skateboard move backwards immediately afterwards?`,
    options: [t`$0.29\ \text{m s}^{-1}$`, t`$0.30\ \text{m s}^{-1}$`, t`$0.33\ \text{m s}^{-1}$`, t`$3.0\ \text{m s}^{-1}$`, t`$3.3\ \text{m s}^{-1}$`, t`$13\ \text{m s}^{-1}$`],
    answer: 1,
    hints: [t`The total momentum is zero before the throw, so it is zero afterwards too.`],
    solution: t`Everything starts at rest, so the total momentum is zero before the throw, and it is still zero afterwards.

The ball's momentum is $1.5 \times 13 = 19.5\ \text{kg m s}^{-1}$ forwards, so the skateboarder and skateboard, of total mass $60 + 5.0 = 65$ kg, must have $19.5\ \text{kg m s}^{-1}$ backwards:
$$v = \frac{19.5}{65} = 0.30\ \text{m s}^{-1}.$$`,
    traps: {
      0: t`Includes the ball in the recoiling mass (66.5 kg); after the throw the ball is no longer with her.`,
      2: t`Leaves out the skateboard's mass; she and the board move together.`,
      3: t`A factor of 10 slip.`,
      5: t`She is much heavier than the ball, so she moves much more slowly than it.`,
    },
    insight: t`In an explosion or a throw from rest, the momenta of the two parts are equal and opposite, so the speeds are in the inverse ratio of the masses.`,
    skills: ['conservation of momentum', 'recoil'],
  },
  {
    id: '3-PH-06',
    module: 'PH',
    n: 6,
    topic: 'P2',
    spec: ['P2.3a', 'P2.3b'],
    title: 'Direction of the force on a wire',
    difficulty: 2,
    time: 70,
    stem: t`A straight wire runs at right angles to the page, between the north pole of a magnet on the left and a south pole on the right. A current flows in the wire **into** the page.`,
    diagram: 'p3-ph-motor',
    diagramAlt: 'A north pole on the left and a south pole on the right, with field lines running from left to right between them. A wire between the poles carries a current into the page, shown as a cross in a circle.',
    prompt: t`In which direction is the force on the wire?`,
    options: [t`towards the north pole`, t`towards the south pole`, t`up the page`, t`down the page`, t`into the page`, t`out of the page`],
    answer: 3,
    hints: [t`Fleming's left-hand rule: First finger for the Field, seCond finger for the Current, thuMb for the Motion.`],
    solution: t`The magnetic field runs from the north pole to the south pole: from left to right.

Use Fleming's left-hand rule: point the **first finger** along the field (to the right) and the **second finger** along the current (into the page). The **thumb** then points **down the page**.

The force is always at right angles to both the field and the current, so it cannot point towards either pole or along the wire.`,
    traps: {
      2: t`This is the result of using the right hand, or of taking the current as flowing out of the page.`,
      0: t`The force is at right angles to the magnetic field, so it cannot point towards either pole.`,
      1: t`The force is at right angles to the magnetic field, so it cannot point towards either pole.`,
      4: t`The force is at right angles to the current, so it cannot act along the wire.`,
    },
    insight: t`The motor-effect force is perpendicular to both the field and the current; Fleming's left-hand rule gives its direction.`,
    skills: ['motor effect', "Fleming's left-hand rule"],
  },
  {
    id: '3-PH-07',
    module: 'PH',
    n: 7,
    topic: 'P5',
    spec: ['P5.1a', 'P5.1b', 'P5.1c', 'P5.4c', 'P5.2a'],
    title: 'The particle model of matter',
    difficulty: 2,
    time: 75,
    stem: t`Consider the following statements about the particle model.`,
    statements: [
      t`Steam is far less dense than liquid water, and far easier to compress, because the particles in steam are much further apart.`,
      t`The particles in a solid do not move at all, which is why a solid keeps its shape.`,
      t`When a gas in a sealed container of fixed volume is heated, its pressure rises because its particles move faster, hitting the walls harder and more often.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s13,
    hints: [t`What do the particles in a solid do as it is warmed?`],
    solution: t`**Statement 1.** True: in a gas the particles are far apart compared with their size. The same mass therefore takes up a much larger volume (steam at $100\ ^\circ\text{C}$ is more than a thousand times less dense than water), and most of that volume is empty space, so the gas can be squashed into a smaller volume. ✓

**Statement 2.** False: the particles in a solid **vibrate** about fixed positions. Strong forces between them hold them in a fixed arrangement, which is why a solid keeps its shape. ✗

**Statement 3.** True: heating increases the particles' average speed (their kinetic energy). They hit the walls more often and with more force, so the pressure rises. ✓

Statements 1 and 3 only.`,
    traps: {
      [ST.all]: t`Particles in a solid vibrate; they are never completely still.`,
      [ST.s1]: t`Statement 3 is also true: faster particles collide with the walls harder and more often.`,
    },
    insight: t`Solids: particles vibrate in fixed positions. Liquids: close together but free to move past each other. Gases: far apart and moving fast in all directions, which is why a gas is roughly a thousand times less dense than the same substance as a solid or liquid.`,
    skills: ['states of matter', 'particle model', 'density', 'gas pressure'],
  },
  {
    id: '3-PH-08',
    module: 'PH',
    n: 8,
    topic: 'P6',
    spec: ['P6.2c', 'P6.1h'],
    title: 'Wavelength of light inside glass',
    difficulty: 2,
    time: 75,
    stem: t`Light of frequency $5.0 \times 10^{14}$ Hz passes from air, where it travels at $3.0 \times 10^8\ \text{m s}^{-1}$, into glass, where it travels at $2.0 \times 10^8\ \text{m s}^{-1}$.

What is its wavelength in the glass?`,
    options: [
      t`$2.5 \times 10^{-7}$ m`,
      t`$4.0 \times 10^{-7}$ m`,
      t`$6.0 \times 10^{-7}$ m`,
      t`$9.0 \times 10^{-7}$ m`,
      t`$2.5 \times 10^{6}$ m`,
      t`$1.0 \times 10^{23}$ m`,
    ],
    answer: 1,
    hints: [t`Which quantity does not change when light crosses a boundary?`],
    solution: t`The frequency is set by the source and does not change at the boundary; the speed and the wavelength change. In the glass,
$$\lambda = \frac{v}{f} = \frac{2.0 \times 10^8}{5.0 \times 10^{14}} = 4.0 \times 10^{-7}\ \text{m}.$$

(In air the wavelength was $6.0 \times 10^{-7}$ m: slowing down by a factor of $\tfrac{2}{3}$ shortens the wavelength by the same factor.)`,
    traps: {
      2: t`$6.0 \times 10^{-7}$ m is the wavelength in *air*; in glass the light is slower.`,
      3: t`Assumes the wavelength *increases* when the light slows down; with the frequency fixed, it decreases.`,
      4: t`Divides the frequency by the speed.`,
      5: t`Multiplies the speed by the frequency.`,
    },
    insight: t`At a boundary the frequency stays the same; speed and wavelength change in proportion ($\lambda = v/f$).`,
    skills: ['wave equation', 'refraction', 'standard form'],
  },
  {
    id: '3-PH-09',
    module: 'PH',
    n: 9,
    topic: 'P6',
    spec: ['P6.5a', 'P6.5b', 'P6.5c', 'P6.5d', 'P6.5e', 'P6.2d'],
    title: 'The electromagnetic spectrum',
    difficulty: 2,
    time: 75,
    stem: t`Consider the following statements about electromagnetic waves.`,
    statements: [
      t`Light waves and water waves are both transverse, but only light can travel through a vacuum; all electromagnetic waves travel at the same speed in a vacuum.`,
      t`In order of increasing frequency, the electromagnetic spectrum is: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays.`,
      t`X-rays are used to image bones because they pass through soft tissue but are absorbed by bone; large doses are harmful because X-rays are ionising.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.all,
    hints: [t`Remember the order of the spectrum: Radio, Micro, Infra, Visible, UV, X, Gamma, from lowest frequency (longest wavelength) to highest.`],
    solution: t`**Statement 1.** True. Both are transverse waves, but water waves need water to travel through, while electromagnetic waves need no medium. In a vacuum every electromagnetic wave travels at $3.0 \times 10^8\ \text{m s}^{-1}$. ✓

**Statement 2.** True. This is the order from the lowest frequency (and longest wavelength) to the highest frequency (and shortest wavelength). ✓

**Statement 3.** True. Bone absorbs X-rays much more than soft tissue does, which gives the contrast in an X-ray image. X-rays are ionising, so they can damage cells and DNA, and exposure is kept as low as possible. ✓

Statements 1, 2 and 3.`,
    traps: {
      [ST.s12]: t`Statement 3 is also true: X-ray imaging relies on bone absorbing more than soft tissue, and X-rays are ionising.`,
      [ST.s13]: t`Statement 2 is also true: that is the order of increasing frequency.`,
    },
    insight: t`All EM waves are transverse and travel at the same speed in a vacuum. Across the spectrum frequency rises as wavelength falls, and from ultraviolet onwards the radiation is ionising.`,
    skills: ['electromagnetic spectrum', 'uses and hazards', 'transverse waves'],
  },
  {
    id: '3-PH-10',
    module: 'PH',
    n: 10,
    topic: 'P3',
    spec: ['P3.7c', 'P3.7d', 'P3.7f', 'P3.7g'],
    title: 'Energy lost when a ball bounces',
    difficulty: 2,
    time: 80,
    stem: t`A ball is dropped from rest from a height of 5.0 m. After bouncing on the ground, it rises to a height of 3.2 m. Air resistance is negligible.

What fraction of its kinetic energy does the ball lose in the bounce, and how fast is it moving just after the bounce?`,
    options: [
      t`0.20 and $8.0\ \text{m s}^{-1}$`,
      t`0.36 and $6.4\ \text{m s}^{-1}$`,
      t`0.36 and $8.0\ \text{m s}^{-1}$`,
      t`0.36 and $10\ \text{m s}^{-1}$`,
      t`0.64 and $8.0\ \text{m s}^{-1}$`,
      t`0.64 and $10\ \text{m s}^{-1}$`,
    ],
    answer: 2,
    hints: [t`Kinetic energy just before the bounce = $mg \times 5.0$; kinetic energy just after = $mg \times 3.2$.`],
    solution: t`With no air resistance, the kinetic energy just before the bounce equals the gravitational potential energy lost, $mg \times 5.0$, and the kinetic energy just after equals the potential energy regained, $mg \times 3.2$.

**Fraction lost.**
$$\frac{5.0 - 3.2}{5.0} = 0.36.$$

**Speed after the bounce.** $\tfrac{1}{2}mv^2 = mgh$ gives
$$v = \sqrt{2gh} = \sqrt{2 \times 10 \times 3.2} = \sqrt{64} = 8.0\ \text{m s}^{-1}.$$

(Just before the bounce it was moving at $\sqrt{2 \times 10 \times 5.0} = 10\ \text{m s}^{-1}$.)`,
    traps: {
      0: t`Uses the ratio of the speeds ($\tfrac{8}{10}$); kinetic energy depends on the *square* of the speed.`,
      4: t`$0.64$ is the fraction of kinetic energy the ball *keeps*.`,
      3: t`$10\ \text{m s}^{-1}$ is the speed just *before* the bounce.`,
      1: t`Takes $v = 2h$; the speed is $\sqrt{2gh}$.`,
    },
    insight: t`Heights measure energies directly: the fraction of height lost in a bounce is the fraction of kinetic energy lost.`,
    skills: ['conservation of energy', 'kinetic energy', 'energy losses'],
  },
  {
    id: '3-PH-11',
    module: 'PH',
    n: 11,
    topic: 'P5',
    spec: ['P5.5b'],
    title: 'Pressure on a diver',
    difficulty: 2,
    time: 70,
    stem: t`Atmospheric pressure is $1.0 \times 10^5$ Pa, and the density of sea water can be taken as $1000\ \text{kg m}^{-3}$.

What is the total pressure on a diver 20 m below the surface of the sea? ($g = 10\ \text{N kg}^{-1}$)`,
    options: [t`$1.0 \times 10^5$ Pa`, t`$1.2 \times 10^5$ Pa`, t`$2.0 \times 10^5$ Pa`, t`$3.0 \times 10^5$ Pa`, t`$4.0 \times 10^5$ Pa`, t`$2.0 \times 10^6$ Pa`],
    answer: 3,
    hints: [t`The water adds $\rho g h$ to the pressure of the atmosphere pressing on the surface.`],
    solution: t`The pressure due to 20 m of water is
$$\rho g h = 1000 \times 10 \times 20 = 2.0 \times 10^5\ \text{Pa}.$$

The atmosphere also presses on the surface, so the total pressure is
$$1.0 \times 10^5 + 2.0 \times 10^5 = 3.0 \times 10^5\ \text{Pa},$$
three times atmospheric pressure.`,
    traps: {
      2: t`$2.0 \times 10^5$ Pa is the pressure due to the water alone; the atmosphere presses on the surface too.`,
      1: t`Leaves out $g$ in $\rho g h$.`,
      0: t`$1.0 \times 10^5$ Pa is only the atmospheric pressure.`,
      4: t`Adds the atmospheric pressure twice.`,
    },
    insight: t`Total pressure at depth $h$ = atmospheric pressure + $\rho g h$; in water, every 10 m adds about one atmosphere.`,
    skills: ['pressure in fluids', 'atmospheric pressure'],
  },
  {
    id: '3-PH-12',
    module: 'PH',
    n: 12,
    topic: 'P1',
    spec: ['P1.2b', 'P1.2c'],
    title: 'Currents, conductors and the mains',
    difficulty: 3,
    time: 80,
    stem: t`Consider the following statements about electric current.`,
    statements: [
      t`In a metal wire, an electric current is a flow of free electrons; an electrical insulator has almost no free charged particles.`,
      t`The UK mains supply is alternating current with a frequency of 50 Hz, so the current changes direction 50 times every second.`,
      t`A battery provides direct current: the charge flows round the circuit in one direction only.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s13,
    hints: [t`In one complete cycle of alternating current, how many times does the current change direction?`],
    solution: t`**Statement 1.** True: metals conduct because they contain free electrons; in an insulator the electrons are held in place, so there is almost nothing to carry a current. ✓

**Statement 2.** False. In each cycle the current flows one way, reverses, then reverses again: **two** changes of direction per cycle. At 50 cycles per second, the current changes direction **100** times every second. ✗

**Statement 3.** True: a battery gives direct current, which flows in one direction only. ✓

Statements 1 and 3 only.`,
    traps: {
      [ST.all]: t`At 50 Hz the current changes direction twice per cycle: 100 times per second, not 50.`,
      [ST.s3]: t`Statement 1 is also true: metals have free electrons and insulators do not.`,
    },
    insight: t`Frequency counts complete cycles per second, and each cycle of alternating current contains two reversals.`,
    skills: ['alternating and direct current', 'conductors and insulators'],
  },
  {
    id: '3-PH-13',
    module: 'PH',
    n: 13,
    topic: 'P2',
    spec: ['P2.3d', 'P2.3c'],
    title: 'Force on a wire, then changing the current and field',
    difficulty: 2,
    time: 75,
    stem: t`A straight wire of length 5.0 cm carries a current of 3.0 A at right angles to a uniform magnetic field of flux density 0.20 T.

What is the size of the force on the wire? If the current is then halved and the magnetic flux density is doubled, what happens to the force?`,
    options: [
      t`0.030 N; it stays the same`,
      t`0.030 N; it doubles`,
      t`0.030 N; it halves`,
      t`0.30 N; it stays the same`,
      t`3.0 N; it stays the same`,
      t`3.0 N; it doubles`,
    ],
    answer: 0,
    hints: [t`$F = BIL$, with $L$ in metres.`],
    solution: t`With the length in metres ($L = 0.050$ m),
$$F = BIL = 0.20 \times 3.0 \times 0.050 = 0.030\ \text{N}.$$

The force is proportional to $B \times I$. Halving $I$ and doubling $B$ leaves their product, and so the force, unchanged.`,
    traps: {
      4: t`Uses the length in centimetres (5.0) instead of metres (0.050).`,
      5: t`Uses the length in centimetres, and counts only the change in the field.`,
      1: t`Counts only the doubling of the field; halving the current cancels it.`,
      2: t`Counts only the halving of the current; doubling the field cancels it.`,
    },
    insight: t`$F = BIL$ (with the wire at right angles to the field): the force is proportional to each of $B$, $I$ and $L$.`,
    skills: ['motor effect', 'F = BIL', 'proportionality'],
  },
  {
    id: '3-PH-14',
    module: 'PH',
    n: 14,
    topic: 'P3',
    spec: ['P3.4a', 'P3.4b', 'P3.5e', 'P3.2b'],
    title: 'Inertia, the first law and air resistance',
    difficulty: 3,
    time: 80,
    stem: t`Consider the following statements about forces and motion.`,
    statements: [
      t`A spacecraft far from any planet or star, with its engines switched off, gradually slows down and stops.`,
      t`A loaded lorry needs a larger resultant force than an empty one to give it the same acceleration, because it has more mass and so more inertia.`,
      t`The air resistance on a cyclist increases with the cyclist's speed, and can be reduced by crouching to reduce the cyclist's frontal area.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s23,
    hints: [t`Newton's first law: what happens to the velocity of an object with no resultant force on it?`],
    solution: t`**Statement 1.** False. Far from any planet or star there is (almost) no gravity and no air resistance, so there is no resultant force. By Newton's first law the spacecraft keeps moving at a **constant velocity**. ✗

**Statement 2.** True. Inertia is an object's resistance to a change in its motion, and it depends on mass: $F = ma$, so a larger mass needs a larger force for the same acceleration. ✓

**Statement 3.** True. Air resistance increases with speed and depends on the object's shape and frontal area (and on the density of the air); crouching reduces the frontal area. ✓

Statements 2 and 3 only.`,
    traps: {
      [ST.all]: t`With no resultant force a moving object keeps moving at constant velocity; it does not need a force to keep going.`,
      [ST.s2]: t`Statement 3 is also true: air resistance depends on speed and on frontal area.`,
    },
    insight: t`No resultant force means constant velocity, not rest. Mass measures inertia. Air resistance grows with speed and frontal area.`,
    skills: ["Newton's first law", 'inertia', 'air resistance'],
  },
  {
    id: '3-PH-15',
    module: 'PH',
    n: 15,
    topic: 'P6',
    spec: ['P6.2b', 'P6.3c', 'P6.3d'],
    title: 'Ray diagram through a glass block',
    difficulty: 3,
    time: 85,
    stem: t`A ray of light in air passes through a rectangular glass block. In the diagrams, the dashed lines are normals.`,
    prompt: t`Which diagram correctly shows the path of the ray?`,
    options: [
      { diagram: 'p3-ph-block-a', alt: 'The ray passes straight through the block without changing direction' },
      { diagram: 'p3-ph-block-b', alt: 'The ray bends away from the normal as it enters the block and leaves parallel to its original direction' },
      { diagram: 'p3-ph-block-c', alt: 'The ray bends towards the normal as it enters, then leaves the block without changing direction again' },
      { diagram: 'p3-ph-block-d', alt: 'The ray bends towards the normal as it enters and bends towards the normal again as it leaves' },
      { diagram: 'p3-ph-block-e', alt: 'The ray bends towards the normal as it enters and leaves at a larger angle to the normal than it arrived at' },
      { diagram: 'p3-ph-block-f', alt: 'The ray bends towards the normal as it enters and bends away from the normal as it leaves, parallel to its original direction' },
    ],
    answer: 5,
    hints: [t`Light slows down in glass. Slowing down bends a ray towards the normal; speeding up bends it away.`, t`The two faces of the block are parallel.`],
    solution: t`- **Entering the glass** the light slows down, so it bends **towards** the normal: the angle of refraction is smaller than the angle of incidence.
- **Leaving the glass** it speeds up again, so it bends **away** from the normal.
- The two faces are parallel, so the ray leaves at the same angle to the normal as it arrived: the emerging ray is **parallel** to the incident ray, shifted sideways.

Only diagram F shows all three.`,
    traps: {
      0: t`A ray that meets a boundary at an angle changes direction, because its speed changes.`,
      1: t`Light slows down in glass, so it bends *towards* the normal as it enters.`,
      2: t`The ray refracts again as it leaves the block, bending away from the normal.`,
      3: t`Leaving the glass the light speeds up, so it bends *away* from the normal.`,
      4: t`With parallel faces the ray leaves at the same angle as it arrived, so it emerges parallel to the incident ray.`,
    },
    insight: t`Into a slower medium: towards the normal. Out into a faster one: away from it. Through a parallel-sided block the ray emerges parallel to its original direction.`,
    skills: ['refraction', 'ray diagrams'],
  },
  {
    id: '3-PH-16',
    module: 'PH',
    n: 16,
    topic: 'P7',
    spec: ['P7.1b', 'P7.1e', 'P7.2a', 'P7.2b', 'P7.3e'],
    title: 'Nuclei, isotopes and a smoke detector',
    difficulty: 3,
    time: 80,
    stem: t`Consider the following statements about atoms and radioactivity.`,
    statements: [
      t`In Rutherford's scattering experiment, most alpha particles passed straight through a thin gold foil, showing that most of an atom is empty space around a tiny, dense nucleus.`,
      t`Carbon-14 is an isotope of carbon with more neutrons than carbon-12; its nuclei are unstable and decay randomly, so it is impossible to predict when a particular nucleus will decay.`,
      t`Smoke detectors use an alpha source because alpha particles can pass through the detector's thick metal casing.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s12,
    hints: [t`Alpha radiation is the most strongly ionising and the least penetrating.`],
    solution: t`**Statement 1.** True: most alpha particles went straight through, and a very few bounced back, so the atom's positive charge and most of its mass are concentrated in a tiny nucleus. ✓

**Statement 2.** True: isotopes have the same number of protons but different numbers of neutrons. Carbon-14 nuclei are unstable, and their decay is random: we can predict what fraction of a large sample will decay, but not when any one nucleus will. ✓

**Statement 3.** False. Alpha sources are used because alpha particles are strongly **ionising**: they ionise the air in a small gap so that a tiny current flows, and smoke absorbs them, reducing the current and setting off the alarm. They are safe because they are **weakly penetrating**: a few centimetres of air or the casing stops them. ✗

Statements 1 and 2 only.`,
    traps: {
      [ST.all]: t`Alpha particles are stopped by the casing; that is why a smoke detector is safe.`,
      [ST.s1]: t`Statement 2 is also true: carbon-14 is an unstable isotope, and decay is random.`,
    },
    insight: t`Alpha: strongly ionising, weakly penetrating, which makes it both useful and safe in a smoke detector. Isotopes differ only in their numbers of neutrons.`,
    skills: ['nuclear model', 'isotopes', 'uses of radiation'],
  },
  {
    id: '3-PH-17',
    module: 'PH',
    n: 17,
    topic: 'P3',
    spec: ['P3.3b', 'P3.3c'],
    title: 'A spring beyond its elastic limit',
    difficulty: 3,
    time: 85,
    stem: t`A spring has a natural length of 12.0 cm. When a 4.0 N load hangs from it, its length is 16.0 cm. The spring obeys Hooke's law for loads up to 10 N; above this, its elastic limit is exceeded.

The 4.0 N load is replaced by a 7.0 N load. Later, a 14 N load is hung on the spring and then removed.

What is the length of the spring with the 7.0 N load, and what happens when the 14 N load is removed?`,
    options: [
      t`19.0 cm; the spring returns to 12.0 cm`,
      t`19.0 cm; the spring stays longer than 12.0 cm`,
      t`28.0 cm; the spring stays longer than 12.0 cm`,
      t`28.0 cm; the spring returns to 12.0 cm`,
      t`7.0 cm; the spring returns to 12.0 cm`,
      t`7.0 cm; the spring stays longer than 12.0 cm`,
    ],
    answer: 1,
    hints: [t`Hooke's law makes the *extension*, not the length, proportional to the load.`],
    solution: t`**7.0 N load.** The extension is $16.0 - 12.0 = 4.0$ cm for 4.0 N, so 1.0 cm per newton. A 7.0 N load (below 10 N) gives an extension of 7.0 cm, so the length is
$$12.0 + 7.0 = 19.0\ \text{cm}.$$

**14 N load.** This is beyond the elastic limit, so the spring is permanently (inelastically) deformed. When the load is removed it does **not** return to its original length: it stays longer than 12.0 cm.`,
    traps: {
      0: t`Beyond the elastic limit the deformation is permanent, so the spring does not return to its original length.`,
      2: t`Treats the stretched length, 16.0 cm, as the extension; Hooke's law makes the extension proportional to the load.`,
      3: t`Treats the length as proportional to the load, and ignores the permanent deformation.`,
      4: t`7.0 cm is the extension, not the length.`,
      5: t`7.0 cm is the extension, not the length.`,
    },
    insight: t`Hooke's law: extension ∝ load, up to the limit of proportionality. Past the elastic limit a spring no longer returns to its original length.`,
    skills: ["Hooke's law", 'elastic limit', 'extension'],
  },
  {
    id: '3-PH-18',
    module: 'PH',
    n: 18,
    topic: 'P4',
    spec: ['P4.4a', 'P4.4b'],
    title: 'Specific heat capacity by the method of mixtures',
    difficulty: 3,
    time: 90,
    stem: t`A 0.50 kg metal block at 100 °C is placed in 0.45 kg of water at 20 °C in an insulated container. When they reach the same temperature, it is 28 °C.

The specific heat capacity of water is $4200\ \text{J kg}^{-1}\,°\text{C}^{-1}$. Assuming no energy is transferred to the container or the surroundings, what is the specific heat capacity of the metal?`,
    options: [t`$105\ \text{J kg}^{-1}\,°\text{C}^{-1}$`, t`$378\ \text{J kg}^{-1}\,°\text{C}^{-1}$`, t`$420\ \text{J kg}^{-1}\,°\text{C}^{-1}$`, t`$840\ \text{J kg}^{-1}\,°\text{C}^{-1}$`, t`$3780\ \text{J kg}^{-1}\,°\text{C}^{-1}$`, t`$4200\ \text{J kg}^{-1}\,°\text{C}^{-1}$`],
    answer: 2,
    hints: [t`Energy lost by the block = energy gained by the water. Each has its own temperature change.`],
    solution: t`**Water.** It warms from 20 °C to 28 °C, gaining
$$0.45 \times 4200 \times 8 = 15\,120\ \text{J}.$$

**Block.** It cools from 100 °C to 28 °C, a change of 72 °C, and loses the same energy:
$$0.50 \times c \times 72 = 15\,120 \quad\Rightarrow\quad c = \frac{15\,120}{36} = 420\ \text{J kg}^{-1}\,°\text{C}^{-1}.$$`,
    traps: {
      1: t`Uses a temperature change of 80 °C for the block; it cools from 100 °C to 28 °C, a change of 72 °C.`,
      4: t`Uses the water's temperature change (8 °C) for the block.`,
      5: t`Assumes the metal has the same specific heat capacity as water.`,
    },
    insight: t`In a mixture, energy lost by the hot object = energy gained by the cold one ($mc\Delta\theta$ each), and each object has its *own* temperature change.`,
    skills: ['specific heat capacity', 'conservation of energy'],
  },
  {
    id: '3-PH-19',
    module: 'PH',
    n: 19,
    topic: 'P2',
    spec: ['P2.2c', 'P2.2d', 'P2.4f'],
    title: 'Electromagnets and transformers',
    difficulty: 3,
    time: 80,
    stem: t`Consider the following statements about magnetic fields and their uses.`,
    statements: [
      t`The magnetic field around a long, straight current-carrying wire gets stronger further away from the wire.`,
      t`Unlike a permanent magnet, an electromagnet can be switched on and off, and its strength can be changed by changing the current.`,
      t`A transformer works with a steady direct current in its primary coil, because this current magnetises the iron core.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s2,
    hints: [t`A voltage is induced only when the magnetic field through a coil changes.`],
    solution: t`**Statement 1.** False. The field is strongest close to the wire and gets weaker with distance; it is stronger when the current is larger. ✗

**Statement 2.** True. An electromagnet's field exists only while a current flows, and a larger current gives a stronger field. ✓

**Statement 3.** False. A transformer relies on electromagnetic induction, which needs a **changing** magnetic field in the core. A steady direct current makes a constant field, so no voltage is induced in the secondary coil (except briefly when the current is switched on or off). ✗

Statement 2 only.`,
    traps: {
      [ST.s12]: t`The field around a wire gets *weaker* further away from it.`,
      [ST.s23]: t`A steady field induces nothing: transformers need alternating current.`,
    },
    insight: t`Field around a wire: stronger with more current, weaker with distance. Induction (and so a transformer) needs a changing field.`,
    skills: ['magnetic field of a wire', 'electromagnets', 'transformers'],
  },
  {
    id: '3-PH-20',
    module: 'PH',
    n: 20,
    topic: 'P1',
    spec: ['P1.2g', 'P1.2i', 'P1.2m'],
    title: 'A lamp and a resistor in parallel',
    difficulty: 3,
    time: 90,
    stem: t`The graph shows the current–potential difference characteristic of a filament lamp. The lamp is connected in parallel with a $12\ \Omega$ resistor across a 6.0 V supply.`,
    diagram: 'p3-ph-iv',
    diagramAlt: 'Current against potential difference for a filament lamp: a curve from the origin that gets less steep, passing through about 0.2 A at 2 V and 0.40 A at 6.0 V.',
    prompt: t`What is the total power supplied to the lamp and the resistor?`,
    options: [t`2.4 W`, t`3.0 W`, t`4.8 W`, t`5.4 W`, t`6.6 W`, t`10.8 W`],
    answer: 3,
    hints: [t`Components in parallel each have the full supply voltage across them.`, t`Read the lamp's current at 6.0 V from the graph.`],
    solution: t`In parallel, the lamp and the resistor each have the full 6.0 V across them.

- **Lamp:** from the graph, the current at 6.0 V is 0.40 A.
- **Resistor:** $I = \dfrac{V}{R} = \dfrac{6.0}{12} = 0.50$ A.

The supply current is $0.40 + 0.50 = 0.90$ A, so the total power is
$$P = VI = 6.0 \times 0.90 = 5.4\ \text{W}.$$`,
    traps: {
      0: t`$2.4$ W is the power of the lamp alone.`,
      1: t`$3.0$ W is the power of the resistor alone.`,
      4: t`Treats the lamp as a fixed resistor, using its resistance at 2 V (about $10\ \Omega$). The filament's resistance rises as it heats up.`,
    },
    insight: t`A filament lamp is not ohmic: read its current at the actual voltage from the graph rather than assuming a constant resistance.`,
    skills: ['I–V characteristics', 'parallel circuits', 'electrical power'],
  },
  {
    id: '3-PH-21',
    module: 'PH',
    n: 21,
    topic: 'P7',
    spec: ['P7.2e', 'P7.2f', 'P7.1e'],
    title: 'One alpha and two beta decays',
    difficulty: 3,
    time: 85,
    stem: t`A nucleus of uranium-238, $^{238}_{92}\text{U}$, emits an alpha particle. The nucleus formed then emits two beta particles, one after the other.

Which of the following is the final nucleus?`,
    options: [
      t`$^{234}_{88}\text{Ra}$`,
      t`$^{234}_{90}\text{Th}$`,
      t`$^{230}_{92}\text{U}$`,
      t`$^{234}_{92}\text{U}$`,
      t`$^{238}_{94}\text{Pu}$`,
      t`$^{234}_{94}\text{Pu}$`,
    ],
    answer: 3,
    hints: [t`Alpha: mass number − 4, atomic number − 2. Beta: mass number unchanged, atomic number + 1.`],
    solution: t`**Alpha decay** removes 2 protons and 2 neutrons: the mass number falls by 4 and the atomic number by 2:
$$^{238}_{92}\text{U} \to\ ^{234}_{90}\text{Th} + {}^{4}_{2}\alpha.$$

**Each beta decay** turns a neutron into a proton: the mass number stays the same and the atomic number rises by 1. Two beta decays give
$$^{234}_{90}\text{Th} \to\ ^{234}_{91}\text{Pa} \to\ ^{234}_{92}\text{U}.$$

The final nucleus, $^{234}_{92}\text{U}$, has 92 protons again: it is uranium, an **isotope** of the original nucleus with 4 fewer neutrons.`,
    traps: {
      1: t`This is the nucleus after the alpha decay only; the two beta decays still have to happen.`,
      0: t`Beta decay *increases* the atomic number, by 1 each time.`,
      4: t`Leaves out the alpha decay.`,
      2: t`Beta decay does not change the mass number.`,
    },
    insight: t`Track mass number and atomic number separately. One alpha plus two betas leaves the atomic number unchanged, so the product is an isotope of the original element.`,
    skills: ['nuclear equations', 'alpha and beta decay', 'isotopes'],
  },
  {
    id: '3-PH-22',
    module: 'PH',
    n: 22,
    topic: 'P3',
    spec: ['P3.1h', 'P3.5d', 'P3.1c'],
    title: 'A stone thrown down from a cliff',
    difficulty: 3,
    time: 90,
    stem: t`A stone is thrown vertically downwards at $5.0\ \text{m s}^{-1}$ from the top of a cliff 30 m high.

Ignoring air resistance, how long does the stone take to reach the ground, and how fast is it moving when it lands?`,
    options: [
      t`2.0 s and $20\ \text{m s}^{-1}$`,
      t`2.0 s and $25\ \text{m s}^{-1}$`,
      t`2.4 s and $24\ \text{m s}^{-1}$`,
      t`3.0 s and $35\ \text{m s}^{-1}$`,
      t`6.0 s and $65\ \text{m s}^{-1}$`,
      t`2.4 s and $29\ \text{m s}^{-1}$`,
    ],
    answer: 1,
    hints: [t`Take downwards as positive: $u = 5.0$, $a = 10$, $s = 30$. Use $s = ut + \tfrac{1}{2}at^2$.`],
    solution: t`Take downwards as positive, with $u = 5.0\ \text{m s}^{-1}$, $a = 10\ \text{m s}^{-2}$ and $s = 30$ m.

**Time.** $s = ut + \tfrac{1}{2}at^2$ gives
$$30 = 5t + 5t^2 \quad\Rightarrow\quad t^2 + t - 6 = 0 \quad\Rightarrow\quad (t + 3)(t - 2) = 0,$$
so $t = 2.0$ s (time cannot be negative).

**Speed.** $v = u + at = 5.0 + 10 \times 2.0 = 25\ \text{m s}^{-1}$.

Check: $v^2 = u^2 + 2as = 25 + 600 = 625$, so $v = 25\ \text{m s}^{-1}$ ✓`,
    traps: {
      0: t`Uses $v = at$, leaving out the initial speed of $5.0\ \text{m s}^{-1}$.`,
      2: t`Treats the stone as dropped from rest, which gives $t = \sqrt{6}$ s and $v = \sqrt{600}\ \text{m s}^{-1}$.`,
      3: t`Sign slip, as if the stone were thrown upwards: $t^2 - t - 6 = 0$.`,
      4: t`Ignores the acceleration: $30 \div 5.0 = 6.0$ s.`,
    },
    insight: t`With an initial velocity, $s = ut + \tfrac{1}{2}at^2$ gives a quadratic in $t$; choose a positive direction and keep to it.`,
    skills: ['equations of motion', 'free fall', 'quadratic equations'],
  },
  {
    id: '3-PH-23',
    module: 'PH',
    n: 23,
    topic: 'P1',
    spec: ['P1.2i', 'P1.2j', 'P1.2k'],
    title: 'Closing a switch lowers one current',
    difficulty: 4,
    time: 110,
    stem: t`In the circuit shown, the battery has negligible internal resistance. The switch S is connected across one of the $3.0\ \Omega$ resistors.`,
    diagram: 'p3-ph-network',
    diagramAlt: 'A 12 V battery in series with a 2.0 ohm resistor and a parallel section. One branch is a 6.0 ohm resistor; the other has two 3.0 ohm resistors in series, with switch S connected across the lower one.',
    prompt: t`What is the current in the $6.0\ \Omega$ resistor when S is open, and when S is closed?`,
    options: [
      t`1.2 A when open; 1.0 A when closed`,
      t`1.2 A when open; 1.2 A when closed`,
      t`1.2 A when open; 1.5 A when closed`,
      t`1.0 A when open; 1.2 A when closed`,
      t`2.0 A when open; 2.0 A when closed`,
      t`2.4 A when open; 3.0 A when closed`,
    ],
    answer: 0,
    hints: [t`Closing S short-circuits one $3.0\ \Omega$ resistor.`, t`Find the p.d. across the parallel section each time.`],
    solution: t`**S open.** The right-hand branch is $3.0 + 3.0 = 6.0\ \Omega$, in parallel with $6.0\ \Omega$, which gives $3.0\ \Omega$. The total resistance is $2.0 + 3.0 = 5.0\ \Omega$, so the battery current is $\dfrac{12}{5.0} = 2.4$ A. The parallel section has $2.4 \times 3.0 = 7.2$ V across it, so the $6.0\ \Omega$ resistor carries $\dfrac{7.2}{6.0} = 1.2$ A.

**S closed.** The switch short-circuits one $3.0\ \Omega$ resistor, so the right-hand branch is $3.0\ \Omega$. In parallel with $6.0\ \Omega$ that gives $\dfrac{6.0 \times 3.0}{6.0 + 3.0} = 2.0\ \Omega$. The total is $4.0\ \Omega$ and the battery current is $3.0$ A. Now the parallel section has only $3.0 \times 2.0 = 6.0$ V across it, so the $6.0\ \Omega$ resistor carries $1.0$ A.

Closing the switch increases the total current, but more of the 12 V is now across the $2.0\ \Omega$ resistor, so the current in the $6.0\ \Omega$ resistor **falls**.`,
    traps: {
      2: t`Assumes every current rises when the total resistance falls. The p.d. across the parallel section drops from 7.2 V to 6.0 V.`,
      1: t`Assumes a change in the other branch cannot affect this one. It changes the p.d. across the whole parallel section.`,
      5: t`These are the currents from the battery, not in the $6.0\ \Omega$ resistor.`,
      4: t`Puts the full 12 V across the $6.0\ \Omega$ resistor, forgetting the $2.0\ \Omega$ resistor in series.`,
      3: t`Swaps the two cases.`,
    },
    insight: t`In a series–parallel circuit, find the p.d. across the parallel section: lowering the resistance of one branch lowers that p.d. and so the current in the other branch.`,
    skills: ['series and parallel circuits', 'potential difference', 'circuit analysis'],
  },
  {
    id: '3-PH-24',
    module: 'PH',
    n: 24,
    topic: 'P7',
    spec: ['P7.4b', 'P7.4c', 'P7.3d'],
    title: 'Half-life after correcting for background',
    difficulty: 4,
    time: 105,
    stem: t`A detector near a radioactive source records 660 counts per minute. With the source removed, the background count rate is 20 counts per minute. Eight hours later, with the source back in the same place, the detector records 60 counts per minute.

What is the half-life of the source?`,
    options: [t`2.0 hours`, t`2.3 hours`, t`2.7 hours`, t`3.0 hours`, t`4.0 hours`, t`8.0 hours`],
    answer: 0,
    hints: [t`Subtract the background count rate from both readings first.`],
    solution: t`The half-life is the time for the count rate from the source (or the number of undecayed nuclei) to halve. Only the counts from the source halve, so first subtract the background from both readings:
$$660 - 20 = 640, \qquad 60 - 20 = 40.$$

Now halve: $640 \to 320 \to 160 \to 80 \to 40$. That is **four** half-lives in 8 hours, so the half-life is
$$\frac{8}{4} = 2.0\ \text{hours}.$$`,
    traps: {
      1: t`Does not subtract the background: 660 to 60 is a factor of 11, about 3.5 half-lives, which gives about 2.3 hours.`,
      2: t`Counts only three halvings (640 to 80).`,
      4: t`Counts only two halvings (640 to 160).`,
    },
    insight: t`Always correct count rates for background before using them: the background does not decay.`,
    skills: ['half-life', 'background radiation', 'radioactive decay'],
  },
  {
    id: '3-PH-25',
    module: 'PH',
    n: 25,
    topic: 'P3',
    spec: ['P3.7c', 'P3.7e', 'P3.7h', 'P2.5d', 'P1.2m'],
    title: 'From falling water to power lost in cables',
    difficulty: 4,
    time: 115,
    stem: t`At a hydroelectric power station, water falls through a height of 80 m at a rate of 500 kg per second. The generators are 90% efficient. The electrical output is transmitted at 20 kV along cables with a total resistance of $5.0\ \Omega$.

What power is lost as heat in the cables? ($g = 10\ \text{N kg}^{-1}$)`,
    options: [t`90 W`, t`1.3 kW`, t`1.6 kW`, t`2.0 kW`, t`18 kW`, t`80 MW`],
    answer: 2,
    hints: [t`Find the electrical power output, then the current in the cables from $P = VI$.`, t`The power lost in the cables is $I^2R$.`],
    solution: t`**Input power.** Each second, 500 kg of water loses gravitational potential energy
$$mgh = 500 \times 10 \times 80 = 400\,000\ \text{J},$$
so the input power is 400 kW.

**Electrical output.** $0.90 \times 400 = 360$ kW.

**Current in the cables.**
$$I = \frac{P}{V} = \frac{360\,000}{20\,000} = 18\ \text{A}.$$

**Power lost.**
$$P = I^2R = 18^2 \times 5.0 = 1620\ \text{W} \approx 1.6\ \text{kW},$$
under 0.5% of the power transmitted, which is why high voltages are used.`,
    traps: {
      3: t`Ignores the 90% efficiency, giving a current of 20 A.`,
      1: t`Applies the 90% efficiency twice.`,
      0: t`$IR = 90$ V is the voltage drop along the cables, not the power lost.`,
      5: t`Uses $\dfrac{V^2}{R}$ with $V = 20$ kV; that voltage is across the whole line and load, not across the cables alone.`,
    },
    insight: t`Power lost in a cable is $I^2R$ with the current found from $P = VI$ at the transmission voltage; do not use the transmission voltage in $V^2/R$.`,
    skills: ['power', 'efficiency', 'power transmission'],
  },
  {
    id: '3-PH-26',
    module: 'PH',
    n: 26,
    topic: 'P3',
    spec: ['P3.6b', 'P3.7c', 'P3.7d', 'P3.7f'],
    title: 'A bullet embedded in a swinging block',
    difficulty: 4,
    time: 110,
    stem: t`A bullet of mass 20 g travelling horizontally at $400\ \text{m s}^{-1}$ hits a wooden block of mass 3.98 kg that is hanging at rest from light strings. The bullet stays in the block.

How high does the block rise as it swings up? ($g = 10\ \text{N kg}^{-1}$)`,
    options: [t`0.020 m`, t`0.10 m`, t`0.20 m`, t`0.40 m`, t`2.0 m`, t`40 m`],
    answer: 2,
    hints: [t`Use conservation of momentum for the impact, then conservation of energy for the swing.`],
    solution: t`**The impact (momentum is conserved).** The bullet and block together have mass 4.00 kg:
$$0.020 \times 400 = 4.00 \times v \quad\Rightarrow\quad v = 2.0\ \text{m s}^{-1}.$$

**The swing (energy is conserved).** After the impact, the block's kinetic energy becomes gravitational potential energy:
$$\tfrac{1}{2}mv^2 = mgh \quad\Rightarrow\quad h = \frac{v^2}{2g} = \frac{2.0^2}{20} = 0.20\ \text{m}.$$

Kinetic energy is **not** conserved in the impact: the bullet has $\tfrac{1}{2} \times 0.020 \times 400^2 = 1600$ J, but just afterwards the block has only $\tfrac{1}{2} \times 4.00 \times 2.0^2 = 8.0$ J. The rest heats and deforms the wood.`,
    traps: {
      5: t`Assumes all of the bullet's kinetic energy becomes potential energy; nearly all of it is transferred to thermal energy in the impact.`,
      3: t`Forgets the $\tfrac{1}{2}$: $h = \dfrac{v^2}{2g}$.`,
      4: t`$2.0$ is the speed of the block just after the impact, in $\text{m s}^{-1}$.`,
    },
    insight: t`Split the motion: momentum is conserved in the collision; energy is conserved in the swing afterwards. Never use energy conservation across a collision where objects stick.`,
    skills: ['conservation of momentum', 'conservation of energy', 'inelastic collisions'],
  },
  {
    id: '3-PH-27',
    module: 'PH',
    n: 27,
    topic: 'P3',
    spec: ['P3.4c', 'P3.2c', 'P3.2d', 'P3.1h'],
    title: 'Connected masses with friction',
    difficulty: 5,
    time: 135,
    stem: t`A block of mass 2.0 kg rests on a horizontal table. It is attached by a light string, which passes over a smooth pulley at the edge of the table, to a hanging mass of 3.0 kg. The system is released from rest, and a constant frictional force of 5.0 N acts on the block.`,
    diagram: 'p3-ph-pulley',
    diagramAlt: 'A 2.0 kg block on a horizontal table is tied to a string that runs over a pulley at the edge of the table to a hanging 3.0 kg mass. A friction force of 5.0 N acts on the block.',
    prompt: t`What is the speed of the hanging mass after it has fallen 1.6 m, and what is the tension in the string? ($g = 10\ \text{N kg}^{-1}$)`,
    options: [
      t`$4.0\ \text{m s}^{-1}$ and 10 N`,
      t`$4.0\ \text{m s}^{-1}$ and 15 N`,
      t`$4.0\ \text{m s}^{-1}$ and 30 N`,
      t`$4.4\ \text{m s}^{-1}$ and 12 N`,
      t`$5.2\ \text{m s}^{-1}$ and 15 N`,
      t`$5.7\ \text{m s}^{-1}$ and 30 N`,
    ],
    answer: 1,
    hints: [
      t`Treat the two masses as one system: the hanging weight drives it and friction opposes it.`,
      t`Then find the tension from the forces on one mass alone.`,
    ],
    solution: t`**Acceleration.** Treat the block and the hanging mass as one system of 5.0 kg. The weight of the hanging mass (30 N) drives it and friction (5.0 N) opposes it:
$$a = \frac{30 - 5.0}{5.0} = 5.0\ \text{m s}^{-2}.$$

**Speed.** From rest, $v^2 = 2as = 2 \times 5.0 \times 1.6 = 16$, so $v = 4.0\ \text{m s}^{-1}$.

**Tension.** For the hanging mass alone, the resultant downward force is its weight minus the tension:
$$30 - T = 3.0 \times 5.0 \quad\Rightarrow\quad T = 15\ \text{N}.$$

Check with the block: $T - 5.0 = 2.0 \times 5.0$, so $T = 15$ N ✓`,
    traps: {
      2: t`The tension equals the hanging weight only if nothing accelerates; here the hanging mass accelerates downwards, so $T < 30$ N.`,
      0: t`Finds the tension from the block but forgets the friction on it: $T - 5.0 = 2.0 \times 5.0$.`,
      3: t`Ignores the friction completely ($a = 6.0\ \text{m s}^{-2}$).`,
      4: t`Uses only the hanging mass in $F = ma$; both masses accelerate together.`,
      5: t`Treats the hanging mass as falling freely.`,
    },
    insight: t`For connected bodies: use the whole system to find the acceleration, then one body on its own to find the tension.`,
    skills: ["Newton's second law", 'connected bodies', 'friction', 'equations of motion'],
  },
];
