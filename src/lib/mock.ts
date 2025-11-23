export const content = [
  {
    title: "Paragraph 1",
    description: `
The system should allow users to organize tasks into groups that can be expanded or collapsed.
Each item in the list should remain readable even when the space becomes limited.
`,
  },
  {
    title: "Short lines",
    description: `
Small task.
Needs action soon.
Check details later.
Review notes.
Finish setup.
Confirm status.
Send update.
Clean workspace.
Archive old items.
Plan next step.
`,
  },
  {
    title: "Long block",
    description: `
This is a longer block intended to push the layout and verify that the paragraph behaves correctly when stretched across multiple lines. It should wrap cleanly, maintain spacing, and avoid clipping or overflow issues in narrow containers.

Another large block helps confirm consistent behavior. When text grows beyond typical lengths, the layout should remain stable, buttons should stay aligned, and the component should scale without breaking.
`,
  },
  {
    title: "Ugly text",
    description: `
LongTaskNameWithoutAnySpacesWhatsoeverToBreakTheUIAndForceOverflowTesting123123123
weird formatting    with    lots     of    gaps
Random CAPS and lowerCaSe MIX tO SEe hOW It WrApS
Symbols!!!! ### $$$ %%% ^^^ &&& *** ((( )))
emoji spam: 😅😅😅😅😅🔥🔥🔥🔥🔥🤖🤖🤖🤖🤖
line-with-dashes-and-underscores----------__________-----------
URLsThatShouldWrapOrOverflowToo: https://example.com/superlongpath/with/no/spaces/just/to/make/your/layout/suffer
`,
  },
  {
    title: "Checklist mock",
    description: `
- Buy groceries
- Update project docs
- Prepare meeting notes
- Check deployment logs
- Water the plants
- Clear inbox
`,
  },
  {
    title: "Dense paragraph",
    description: `
This block is packed tighter to simulate a scenario where the user writes without spacing or line breaks, making it useful for layout pressure-testing and ensuring that long dense text still wraps, maintains readability, and doesn't overflow its container or disrupt the overall card structure.
`,
  },

  // --- New mock card 1 ---
  {
    title: "Mixed content",
    description: `
Task 1: Finish report
Task 2: Call client 📞
Reminder: Check emails
Note: Remember to back up files 💾
`,
  },

  // --- New mock card 2 ---
  {
    title: "Multiline lorem",
    description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum orci ac risus dignissim, ac tincidunt urna suscipit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
`,
  },

  // --- New mock card 3 ---
  {
    title: "Code snippet",
    description: `
function greet(name) {
  console.log('Hello, ' + name + '!');
}

greet('World');
`,
  },

  // --- New mock card 4 ---
  {
    title: "Emoji overload",
    description: `
😀 😃 😄 😁 😆 😅 😂 🤣 🥲 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥸 🤩
`,
  },

  // --- New mock card 5 ---
  {
    title: "Warning style",
    description: `
⚠️ Important: Backup your data before proceeding.
⚠️ Check permissions on all folders.
⚠️ Ensure no other processes are running.
`,
  },

  // --- New mock card 6 ---
  {
    title: "Random paragraphs",
    description: `
The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
Sphinx of black quartz, judge my vow. How quickly daft jumping zebras vex.
`,
  },
];
