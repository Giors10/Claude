import type { LearnTopic } from './types';

const t = String.raw;

export const LEARN_PH: LearnTopic[] = [
  {
    code: 'P1',
    module: 'PH',
    title: 'Electricity',
    summary: 'Charge, current, voltage, resistance and power; series and parallel circuits; potential dividers and component characteristics.',
    specNote: t`Electrostatics, circuit symbols, $I = Q/t$, $V = IR$, $V = E/Q$, $P = IV = I^2R$, $E = VIt$, series and parallel rules, thermistors, LDRs, diodes, filament lamp and resistor I–V graphs.`,
    sections: [
      {
        heading: 'The core relationships',
        body: t`Current is the rate of flow of charge ($I = \tfrac Qt$). Voltage is energy per unit charge ($V = \tfrac EQ$). Resistance is $R = \tfrac VI$. Power is $P = IV = I^2R = \tfrac{V^2}{R}$, and energy is $E = VIt$.

A battery rated in mAh stores charge: $1\ \text{mAh} = 3.6$ C.`,
      },
      {
        heading: 'Series and parallel',
        body: t`**Series:** the same current flows through each component; voltages add; resistances add.

**Parallel:** each branch has the same voltage; currents add; the combined resistance is less than the smallest branch:
$$\frac{1}{R} = \frac{1}{R_1} + \frac{1}{R_2}, \qquad \text{so two in parallel give } R = \frac{R_1R_2}{R_1 + R_2}.$$
Adding a parallel branch lowers the total resistance and raises the total current, so series resistors take a bigger share of the supply voltage.`,
      },
      {
        heading: 'Potential dividers and sensors',
        body: t`In series, voltages divide in the ratio of the resistances: $V_1 : V_2 = R_1 : R_2$, so $V_2 = V\dfrac{R_2}{R_1 + R_2}$.

An NTC thermistor's resistance **falls** as it warms; an LDR's resistance **falls** in brighter light. A diode conducts in one direction only.`,
      },
      {
        heading: 'I–V characteristics',
        body: t`A fixed resistor at constant temperature gives a straight line through the origin. A filament lamp's curve flattens: as it heats up its resistance rises. In series, read the graphs at a common **current**; in parallel, read them at a common **voltage**.`,
      },
      {
        heading: 'Real meters',
        body: 'An ideal ammeter has zero resistance and an ideal voltmeter infinite resistance. A voltmeter with a finite resistance forms a parallel combination with the component it measures, lowering the reading.',
      },
      {
        heading: 'Electrostatics',
        body: 'Rubbing insulators transfers electrons: the object gaining electrons becomes negative. Like charges repel and unlike charges attract. Earthing lets charge flow away safely.',
      },
    ],
    formulas: [
      { name: 'Charge and current', tex: t`Q = It` },
      { name: 'Ohm’s law', tex: t`V = IR` },
      { name: 'Energy per charge', tex: t`V = \dfrac{E}{Q}` },
      { name: 'Power', tex: t`P = IV = I^2R = \dfrac{V^2}{R}` },
      { name: 'Energy transferred', tex: t`E = VIt = Pt` },
      { name: 'Parallel resistors', tex: t`\dfrac1R = \dfrac1{R_1} + \dfrac1{R_2}` },
    ],
    traps: [t`Using the supply voltage in $V^2/R$ for a component that only has part of it.`, 'Assuming closing a switch leaves other voltages unchanged.'],
    tips: ['Redraw the circuit with the switch open or closed before calculating.', 'Use ratios in potential dividers; the current is rarely needed.'],
    example: {
      question: 'Two 6 Ω resistors in parallel are connected in series with a 3 Ω resistor across a 12 V supply. What is the current from the supply?',
      solution: t`The parallel pair is $3\ \Omega$, so the total is $6\ \Omega$ and $I = \dfrac{12}{6} = 2$ A.`,
    },
  },
  {
    code: 'P2',
    module: 'PH',
    title: 'Magnetism',
    summary: 'Field patterns, the motor effect (F = BIL), electromagnetic induction, generators and transformers.',
    specNote: t`Magnets and induced magnetism, fields of wires and solenoids, $F = BIL$ and Fleming’s left-hand rule, the dc motor, induction and the ac generator, transformers ($V_p/V_s = n_p/n_s$, $V_pI_p = V_sI_s$) and power transmission.`,
    sections: [
      {
        heading: 'Fields',
        body: 'Field lines run from N to S outside a magnet. A straight current makes circular field lines (right-hand grip rule); a solenoid behaves like a bar magnet. Iron is magnetically soft (easily magnetised and demagnetised); steel is hard (keeps its magnetism).',
      },
      {
        heading: 'The motor effect',
        body: t`A current at right angles to a field feels $F = BIL$. Direction: **Fleming's left-hand rule**. First finger for the Field, seCond finger for the Current, thuMb for the Motion (force). The force is zero when the current is parallel to the field.`,
      },
      {
        heading: 'Electromagnetic induction',
        body: 'A voltage is induced when a conductor cuts field lines or the field through a coil changes. The voltage is bigger for faster motion, a stronger field and more turns. Reversing the motion or the pole reverses it. Spinning an ac generator faster raises both the peak voltage and the frequency.',
      },
      {
        heading: 'Transformers and transmission',
        body: t`$\dfrac{V_p}{V_s} = \dfrac{n_p}{n_s}$, and for an ideal transformer $V_pI_p = V_sI_s$: stepping the voltage up steps the current down. Cable losses are $I^2R$, so stepping up the voltage by a factor $k$ cuts the losses by $k^2$. Transformers need ac.`,
      },
    ],
    formulas: [
      { name: 'Force on a wire', tex: t`F = BIL` },
      { name: 'Turns ratio', tex: t`\dfrac{V_p}{V_s} = \dfrac{n_p}{n_s}` },
      { name: 'Ideal transformer', tex: t`V_pI_p = V_sI_s` },
      { name: 'Transmission loss', tex: t`P_{\text{loss}} = I^2R` },
    ],
    traps: ['Thinking a step-up transformer increases power.', 'Using the right hand for the motor effect.'],
    tips: ['Set up axes (east, north, up) and check the direction with the left-hand rule.'],
    example: {
      question: 'A transformer steps 230 V down to 12 V and supplies 10 A. Assuming it is ideal, what current does it draw?',
      solution: t`$I_p = \dfrac{V_sI_s}{V_p} = \dfrac{12 \times 10}{230} \approx 0.52$ A.`,
    },
  },
  {
    code: 'P3',
    module: 'PH',
    title: 'Mechanics',
    summary: 'Motion graphs and equations, forces and Newton’s laws, momentum, work, energy, power and springs.',
    specNote: t`Scalars and vectors, motion graphs, $v^2 - u^2 = 2as$, forces and resultant force in one dimension, Hooke’s law and elastic energy, Newton’s laws, mass and weight ($g = 10\ \text{N kg}^{-1}$), terminal velocity, momentum and $F = \Delta p/\Delta t$, work, energy, power and efficiency.`,
    sections: [
      {
        heading: 'Motion',
        body: t`On a velocity–time graph the gradient is acceleration and the area is displacement. For constant acceleration:
$$v = u + at, \qquad s = ut + \tfrac12at^2, \qquad s = \tfrac12(u + v)t, \qquad v^2 = u^2 + 2as.$$
(All of these follow from the v–t graph.) With the same deceleration, braking distance is proportional to $u^2$, while thinking distance is proportional to $u$. Objects with the same acceleration have a constant relative velocity.`,
      },
      {
        heading: 'Forces and Newton’s laws',
        body: t`Resultant force $= ma$. Weight $= mg$ with $g = 10\ \text{N kg}^{-1}$. For connected bodies, find $a$ from the whole system, then isolate one part to find an internal force (tension or contact).

Scales read the normal contact force: $R = m(g + a)$ with upwards positive. At terminal velocity, drag equals weight.`,
      },
      {
        heading: 'Momentum',
        body: t`$p = mv$ is a vector: when a ball rebounds, the change in momentum adds the two speeds. Total momentum is conserved in collisions and explosions. Force is the rate of change of momentum: $F = \dfrac{\Delta p}{\Delta t}$.

In an explosion from rest, the pieces have equal and opposite momenta, and since $E_k = \dfrac{p^2}{2m}$ the lighter piece gets more kinetic energy. Kinetic energy is usually **not** conserved in collisions.`,
      },
      {
        heading: 'Energy, work and power',
        body: t`$W = Fd$ (distance in the direction of the force), $E_k = \tfrac12mv^2$, $\Delta E_p = mgh$, $P = \dfrac{E}{t}$, $\;\text{efficiency} = \dfrac{\text{useful output}}{\text{total input}}$.

Friction on a slope: work against friction $= $ energy lost $= F \times$ distance along the slope, which avoids resolving forces.`,
      },
      {
        heading: 'Springs',
        body: t`Hooke's law: $F = kx$ up to the limit of proportionality. Elastic energy is $E = \tfrac12Fx = \tfrac12kx^2$. In series each spring carries the full load; in parallel they share it.`,
      },
    ],
    formulas: [
      { name: 'Equations of motion', tex: t`v^2 = u^2 + 2as, \quad s = ut + \tfrac12at^2` },
      { name: 'Newton’s second law', tex: t`F = ma = \dfrac{\Delta p}{\Delta t}` },
      { name: 'Momentum', tex: t`p = mv` },
      { name: 'Kinetic energy', tex: t`E_k = \tfrac12mv^2 = \dfrac{p^2}{2m}` },
      { name: 'Gravitational PE', tex: t`\Delta E_p = mgh` },
      { name: 'Power', tex: t`P = \dfrac{E}{t} = Fv` },
      { name: 'Hooke’s law and elastic energy', tex: t`F = kx, \quad E = \tfrac12kx^2` },
    ],
    traps: ['Subtracting speeds instead of adding them when a ball rebounds.', 'Assuming kinetic energy is conserved in a collision.', 'Using mass where weight is needed.'],
    tips: ['Choose a positive direction and stick to it.', 'For "how fast / how far" questions, look for an energy route first.'],
    example: {
      question: 'A 1200 kg car accelerates uniformly from rest to 20 m/s in 8.0 s. Find the resultant force and the average power delivered to its kinetic energy.',
      solution: t`$a = \dfrac{20}{8} = 2.5\ \text{m s}^{-2}$, so $F = 1200 \times 2.5 = 3000$ N. The kinetic energy gained is $\tfrac12 \times 1200 \times 20^2 = 240$ kJ, so the average power is $\dfrac{240\,000}{8} = 30$ kW.`,
    },
  },
  {
    code: 'P4',
    module: 'PH',
    title: 'Thermal physics',
    summary: 'Conduction, convection, thermal radiation and specific heat capacity.',
    specNote: 'Conductors and insulators and factors affecting conduction, convection from density changes, infrared radiation and the effect of surfaces, and specific heat capacity (J kg⁻¹ °C⁻¹).',
    sections: [
      {
        heading: 'Three ways energy moves',
        body: 'Conduction passes energy through vibrating particles (and free electrons in metals); it is faster for a larger area, a bigger temperature difference and a thinner layer. Convection happens in fluids: warmer fluid is less dense and rises. Thermal radiation is infrared, needs no medium, and is emitted and absorbed best by matt black surfaces and least by shiny silver ones.',
      },
      {
        heading: 'Specific heat capacity',
        body: t`$E = mc\Delta\theta$. For heating by a power $P$, $Pt = mc\Delta\theta$. When hot and cold objects are mixed in an insulated container, energy lost equals energy gained, so they reach one final temperature.`,
      },
    ],
    formulas: [
      { name: 'Heating', tex: t`E = mc\Delta\theta` },
      { name: 'Heating by a power', tex: t`Pt = mc\Delta\theta` },
      { name: 'Mixing', tex: t`m_1c_1(\theta_1 - \theta) = m_2c_2(\theta - \theta_2)` },
    ],
    traps: ['Using a temperature instead of a temperature change.', 'Mixing kJ and J.'],
    tips: ['Set out mixing problems as "energy lost = energy gained" before substituting.'],
    example: {
      question: t`A 2.0 kW kettle heats 1.5 kg of water ($c = 4200\ \text{J kg}^{-1}\,{}^\circ\text{C}^{-1}$) from 20 °C to 100 °C. How long does this take?`,
      solution: t`$E = 1.5 \times 4200 \times 80 = 504\,000$ J, so $t = \dfrac{504\,000}{2000} = 252$ s.`,
    },
  },
  {
    code: 'P5',
    module: 'PH',
    title: 'Matter',
    summary: 'Particle model, gas pressure and Boyle’s law, latent heat, density and pressure in liquids.',
    specNote: t`States of matter and the particle model, gas pressure and $pV = \text{constant}$ at constant temperature, melting and boiling, specific latent heat, density, pressure $= F/A$ and hydrostatic pressure $\rho g h$.`,
    sections: [
      {
        heading: 'Gases',
        body: 'Gas pressure comes from particles colliding with the walls. At constant temperature and mass, pV is constant (Boyle’s law): halving the volume doubles the pressure because collisions happen twice as often.',
      },
      {
        heading: 'Changes of state',
        body: t`During melting or boiling the temperature stays constant while energy breaks bonds: $E = mL$. A heating curve has flat sections at the melting and boiling points. Heating ice at $-20$ °C to water at 40 °C has three stages: warm the ice, melt it, warm the water.`,
      },
      {
        heading: 'Density and pressure',
        body: t`$\rho = \dfrac mV$. For a mixture, density is total mass ÷ total volume. With equal masses this is **not** the average of the densities.

Pressure is $p = \dfrac FA$, and in a liquid $p = \rho gh$ plus the atmospheric pressure on the surface. In a connected liquid at rest, points at the same level have the same pressure: this is how U-tubes compare densities.`,
      },
    ],
    formulas: [
      { name: 'Density', tex: t`\rho = \dfrac mV` },
      { name: 'Pressure', tex: t`p = \dfrac FA` },
      { name: 'Hydrostatic pressure', tex: t`p = p_{\text{atm}} + \rho gh` },
      { name: 'Boyle’s law', tex: t`p_1V_1 = p_2V_2` },
      { name: 'Latent heat', tex: t`E = mL` },
    ],
    traps: ['Forgetting atmospheric pressure at depth.', 'Averaging densities for equal masses.'],
    tips: ['Every 10 m of water adds about 100 kPa, roughly one atmosphere.'],
    example: {
      question: 'Gas at 150 kPa occupies 2.0 L. It is compressed to 0.50 L at constant temperature. What is the new pressure?',
      solution: t`$p_2 = \dfrac{150 \times 2.0}{0.50} = 600$ kPa.`,
    },
  },
  {
    code: 'P6',
    module: 'PH',
    title: 'Waves',
    summary: 'Wave properties, v = fλ, reflection and refraction, sound and echoes, the Doppler effect and the EM spectrum.',
    specNote: t`Transverse and longitudinal waves, amplitude, wavelength, frequency, period, $v = f\lambda$, reflection, refraction, the Doppler effect, plane mirrors, refraction ray diagrams, sound (20 Hz–20 kHz, echoes, ultrasound) and the electromagnetic spectrum.`,
    sections: [
      {
        heading: 'Describing waves',
        body: t`Waves transfer energy without net transfer of matter. $v = f\lambda$ and $T = \dfrac1f$. Transverse waves (including all EM waves) oscillate perpendicular to the direction of travel; longitudinal waves (sound) oscillate along it, with compressions and rarefactions.`,
      },
      {
        heading: 'Reflection and refraction',
        body: 'At a boundary the frequency stays the same, while speed and wavelength change in proportion. A wave that slows down bends towards the normal; one that speeds up bends away from it. The angle of incidence equals the angle of reflection, both measured from the normal.',
      },
      {
        heading: 'Sound',
        body: 'Sound needs a medium. Humans hear 20 Hz to 20 kHz; ultrasound is above that and is used for sonar and medical scanning. In an echo the sound travels there and back, so distance = speed × time ÷ 2 for a stationary source. If the source moves, add up the distances each travels.',
      },
      {
        heading: 'Doppler effect and the EM spectrum',
        body: t`A source moving towards you is heard at a higher frequency; moving away, lower. The EM spectrum in order of increasing frequency (decreasing wavelength): radio, microwave, infrared, visible, ultraviolet, X-ray, gamma. All travel at $3 \times 10^8\ \text{m s}^{-1}$ in a vacuum.`,
      },
    ],
    formulas: [
      { name: 'Wave equation', tex: t`v = f\lambda` },
      { name: 'Period', tex: t`T = \dfrac1f` },
      { name: 'Echo', tex: t`d = \dfrac{vt}{2}` },
      { name: 'Speed of light', tex: t`c = 3.0 \times 10^8\ \text{m s}^{-1}` },
    ],
    traps: ['Thinking the frequency changes on refraction.', 'Forgetting to halve the echo distance.'],
    tips: [t`Convert cm to m before using $v = f\lambda$.`],
    example: {
      question: 'A radio station broadcasts at 100 MHz. What is the wavelength?',
      solution: t`$\lambda = \dfrac{3 \times 10^8}{1.0 \times 10^8} = 3.0$ m.`,
    },
  },
  {
    code: 'P7',
    module: 'PH',
    title: 'Radioactivity',
    summary: 'Atomic structure, alpha, beta and gamma decay, nuclear equations, ionising radiation and half-life.',
    specNote: 'Protons, neutrons and electrons, isotopes and nuclide notation, the random nature of decay, alpha/beta/gamma properties and deflection, nuclear equations, background radiation, uses and hazards, and half-life calculations including decay products.',
    sections: [
      {
        heading: 'Decays',
        body: t`**Alpha** ($^{4}_{2}\text{He}$): mass number $-4$, proton number $-2$. **Beta-minus** (an electron): mass number unchanged, proton number $+1$. **Gamma**: no change in either. For a decay chain, balance the mass numbers first (only alpha changes them), then the proton numbers.`,
      },
      {
        heading: 'Properties',
        body: 'Alpha is the most ionising and least penetrating (stopped by paper); beta is intermediate (stopped by a few mm of aluminium); gamma is the least ionising and most penetrating (reduced by thick lead). In electric or magnetic fields alpha and beta bend in opposite directions, beta more strongly; gamma is not deflected.',
      },
      {
        heading: 'Half-life',
        body: t`After $n$ half-lives the fraction remaining is $\left(\tfrac12\right)^n$. If the parent decays to a stable daughter, the ratio daughter : parent after $n$ half-lives is $(2^n - 1) : 1$. Subtract the background count rate before halving.`,
      },
    ],
    formulas: [
      { name: t`Remaining after $n$ half-lives`, tex: t`N = N_0\left(\tfrac12\right)^n` },
      { name: 'Daughter to parent', tex: t`(2^n - 1) : 1` },
      { name: 'Alpha decay', tex: t`^{A}_{Z}\text{X} \to {}^{A-4}_{Z-2}\text{Y} + {}^{4}_{2}\alpha` },
      { name: 'Beta-minus decay', tex: t`^{A}_{Z}\text{X} \to {}^{A}_{Z+1}\text{Y} + {}^{\phantom{-}0}_{-1}\beta` },
    ],
    traps: ['Halving a count rate that still includes background radiation.', 'Thinking beta decay changes the mass number.'],
    tips: ['Count half-lives rather than using logarithms: the ESAT uses whole numbers of half-lives.'],
    example: {
      question: 'A sample has an activity of 800 Bq and a half-life of 5 minutes. What is its activity after 20 minutes?',
      solution: t`20 minutes is 4 half-lives, so the activity is $800 \times \left(\tfrac12\right)^4 = 50$ Bq.`,
    },
  },
];
