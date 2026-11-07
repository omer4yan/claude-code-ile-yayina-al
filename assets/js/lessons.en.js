/* =========================================================
   Lesson content (English) — faithful translation of assets/js/lessons.tr.js
   ---------------------------------------------------------
   Same structure and ids as the Turkish file; no new information is added.
   Prompts and commands stay as in the Turkish lessons. The Turkish
   "Anlamı: …" (meaning) sentences are left out, since the prompts are
   already in English.
   Lessons with ready: false link to en/yolculuk.html#id until translated.
   ========================================================= */
window.ORVENA_LESSONS = {
  course: `Claude Code ile Yayına Al`,
  modules: [
    {
      id: `m1`, no: 1, title: `Install Claude Code`, sub: `First steps in the terminal`,
      lessons: [
        {
          id: `m1-d1`, title: `Terminal, in your browser`, minutes: 8, ready: true,
          intro: [
            `Over the next few minutes you'll get to know the terminal and set up a folder for your first project. You'll do this lesson's exercises in the practice terminal on this page: no installation or paid plan is needed, and the commands you type don't touch the files on your computer.`
          ],
          blocks: [
            { t: `callout`, kind: `info`, title: `In this lesson`, html: `You'll ask where you are, list folders, create a new folder and move into it.` },
            { t: `h`, text: `Step 1 — Meet the terminal` },
            { t: `p`, html: `The terminal is a window where you give the computer instructions by typing instead of clicking. Programmers use the terminal a lot; Claude Code, the subject of this course, runs in the terminal too.` },
            { t: `p`, html: `Open the practice terminal with the <strong>Open sandbox</strong> button below and click inside it. The blinking block next to the <code>$</code> sign on the last line is the cursor; it shows that the terminal is waiting for a command. Type the command and press <kbd>Enter</kbd>.` },
            { t: `practice` },
            { t: `callout`, kind: `tip`, title: `How to read the examples`, html: `A line starting with <code>$</code> is a command; don't type the <code>$</code> sign. The “You should see” box underneath is the response you can expect from the terminal.` },
            { t: `h`, text: `Step 2 — Ask where you are` },
            { t: `p`, html: `Type this and press <kbd>Enter</kbd>:` },
            { t: `cmd`, code: `pwd`, expect: `~` },
            { t: `p`, html: `<code>pwd</code> is short for “print working directory”. A directory means a folder. The <code>~</code> response stands for your home folder; every terminal session starts there.` },
            { t: `h`, text: `Step 3 — Look around` },
            { t: `cmd`, code: `ls`, expect: `Documents/  Downloads/` },
            { t: `p`, html: `<code>ls</code> lists the contents of the folder you're in. In this example there are two folders, Documents and Downloads. The <code>/</code> at the end of a name shows that it's a folder, not a file.` },
            { t: `h`, text: `Step 4 — Create the project folder` },
            { t: `p`, html: `Give every project its own folder. Create one for your first project:` },
            { t: `cmd`, code: `mkdir my-first-project` },
            { t: `p`, html: `Getting no response is normal: when a command succeeds, the terminal usually stays quiet and opens a new command line. In the terminal, silence often means the job is done. To check, run <code>ls</code> again; you should also see the <code>my-first-project/</code> folder in the list.` },
            { t: `p`, html: `Now move into the folder and ask where you are again:` },
            { t: `cmd`, code: `cd my-first-project` },
            { t: `cmd`, code: `pwd`, expect: `~/my-first-project` },
            { t: `p`, html: `<code>cd</code> means “change directory” and changes the folder you're in. <code>pwd</code> now says <code>~/my-first-project</code>: you've moved.` },
            { t: `callout`, kind: `tip`, title: `Tip`, html: `Type the commands yourself instead of clicking the suggestions; once you type a command yourself, it stops being magic and turns into a few familiar letters. Use the up arrow key to go back to previous commands, and <kbd>Ctrl</kbd> + <kbd>L</kbd> (<kbd>Command</kbd> + <kbd>L</kbd> on a Mac) to clear the screen.` }
          ],
          trouble: [
            { q: `I see “command not found”`, a: `Check the command letter by letter: it should be lowercase, with no extra spaces. Type this lesson's commands into the practice terminal on this page, not into your computer's terminal.` },
            { q: `mkdir says “File exists”`, a: `The folder already exists; you don't need to create it again. Confirm it's in the list with <code>ls</code> and move into it with <code>cd my-first-project</code>.` }
          ],
          have: [
            `Four basic commands you can use: <code>pwd</code>, <code>ls</code>, <code>mkdir</code> and <code>cd</code>.`,
            `A project folder called <code>my-first-project</code>, and you're inside it right now.`
          ],
          note: `In this lesson I learned that a command printing nothing in the terminal isn't an error; most of the time it means success.`,
          next: `Next: you'll ask Claude to create a file in this folder, then look at the file. You'll still be working in the browser; you'll install Claude Code on your own computer at the start of Module 2.`,
          prompt: `I'm new to the terminal. Could you explain what the pwd, ls, mkdir and cd commands do with simple examples? Then give me 3 small exercises to try them.`,
          sandbox: {
            cwd: `~`,
            dirs: [`~`, `~/Documents`, `~/Downloads`],
            files: {},
            try: [
              { cmd: `pwd`, desc: `which folder am I in?` },
              { cmd: `ls`, desc: `what's in it?` },
              { cmd: `mkdir my-first-project`, desc: `create a project folder` },
              { cmd: `cd my-first-project`, desc: `move into the folder` }
            ]
          }
        },
        {
          id: `m1-d2`, title: `Your first file`, minutes: 6, ready: true,
          intro: [
            `Your project folder is ready. Now you'll give Claude a job, watch it do the job, and then check for yourself that the file was really created and that its contents are right.`
          ],
          blocks: [
            { t: `callout`, kind: `info`, title: `Practice environment`, html: `This exercise is also done in the practice terminal. A simulated Claude Code runs inside it; no installation or paid plan is needed. You'll move on to working with the real Claude Code at the start of Module 2. Starting location: <code>~/my-first-project</code>` },
            { t: `practice` },
            { t: `h`, text: `Step 1 — Ask for a file` },
            { t: `p`, html: `Type the command below and press <kbd>Enter</kbd>. Try typing it yourself instead of pasting it. The part in quotes isn't a terminal command; it's an instruction you give Claude in an ordinary sentence.` },
            { t: `cmd`, code: `claude "make a file called hello.txt that says hello"`, expect: `[OK] wrote hello.txt` },
            { t: `p`, html: `The response reports that the simulated Claude wrote the file. In the next step you'll check this yourself.` },
            { t: `callout`, kind: `warn`, title: `About approval`, html: `When you work with Claude Code on your own computer, it may ask for approval for operations such as writing a file. This depends on the permission settings and the working mode; you'll see why permissions matter in lesson 5.` },
            { t: `h`, text: `Step 2 — Find the file and read its contents` },
            { t: `p`, html: `Don't skip this step. Checking the result is as important as Claude saying it did the job. First list the folder's contents:` },
            { t: `cmd`, code: `ls`, expect: `hello.txt` },
            { t: `p`, html: `The file appears in the list. Now read its contents:` },
            { t: `cmd`, code: `cat hello.txt`, expect: `hello` },
            { t: `p`, html: `<code>cat</code> prints a file's contents to the terminal screen. You didn't write the word inside the file: you described what you wanted, Claude created the file, and you verified the result.` },
            { t: `p`, html: `If you want to remember which folder the file is in, use the <code>pwd</code> command:` },
            { t: `cmd`, code: `pwd`, expect: `~/my-first-project` }
          ],
          trouble: [
            { q: `I see “command not found”`, a: `Check that the command starts with <code>claude</code> and is typed correctly. Do this exercise in the practice terminal on this page, not in your computer's terminal.` },
            { q: `Claude gives a different response`, a: `Compare the file name and the instruction in quotes with the example, letter by letter. Then check the result with <code>ls</code> and <code>cat hello.txt</code>.` }
          ],
          have: [
            `You asked Claude to create a file in an ordinary sentence.`,
            `You saw the file appear in the project folder.`,
            `You found the file and read its contents yourself.`
          ],
          note: `In this lesson I learned how important it is not to settle for Claude saying “done”, and to verify the result myself with <code>ls</code> and <code>cat</code>.`,
          next: `Next: you'll learn where files are saved and how to decide where your next file goes.`,
          prompt: `When Claude says it created a file while I'm working with Claude Code, how do I verify the result in the terminal? Could you walk me through it step by step with the ls and cat commands?`,
          sandbox: {
            cwd: `~/my-first-project`,
            dirs: [`~`, `~/Documents`, `~/Downloads`, `~/my-first-project`],
            files: {},
            claude: [
              { match: `make a file called hello.txt that says hello`, write: { "~/my-first-project/hello.txt": `hello` }, out: [`[OK] wrote hello.txt`] }
            ],
            try: [
              { cmd: `claude "make a file called hello.txt that says hello"`, desc: `ask Claude for a file` },
              { cmd: `ls`, desc: `was the file created?` },
              { cmd: `cat hello.txt`, desc: `what does it say?` },
              { cmd: `pwd`, desc: `which folder am I in?` }
            ]
          }
        },
        {
          id: `m1-d3`, title: `Where did that file go?`, minutes: 6, ready: true,
          intro: [
            `In the previous lesson you created the <code>hello.txt</code> file. Now you'll find which folder it's in and learn how to decide where new files are saved.`
          ],
          blocks: [
            { t: `callout`, kind: `info`, title: `The core idea`, html: `At any moment the terminal has a working directory, that is, a folder it's in. Starting Claude in the project folder sets the context of the work. Files created with relative paths are saved according to the path used and the working directory.` },
            { t: `callout`, kind: `warn`, title: `About access`, html: `Don't assume Claude Code can only see the folder it was started in. Its access to other locations may depend on permissions, added directories and sandbox settings. The project folder on its own is not a security boundary.` },
            { t: `practice` },
            { t: `h`, text: `Step 1 — Find your file in the practice terminal` },
            { t: `p`, html: `This time you're one level above the project folder. First ask where you are:` },
            { t: `cmd`, code: `pwd`, expect: `~` },
            { t: `p`, html: `Now list the contents:` },
            { t: `cmd`, code: `ls`, expect: `Documents/  Downloads/  my-first-project/` },
            { t: `p`, html: `What matters is finding the <code>my-first-project</code> folder. <code>hello.txt</code> doesn't appear here, because it's inside the project folder.` },
            { t: `callout`, kind: `tip`, title: `Remember`, html: `Changing the folder the terminal is in doesn't move the file. The file stays where it is; what changes is the folder you're in.` },
            { t: `h`, text: `Step 2 — Move into the project folder` },
            { t: `cmd`, code: `cd my-first-project` },
            { t: `cmd`, code: `pwd`, expect: `~/my-first-project` },
            { t: `cmd`, code: `cat hello.txt`, expect: `hello` },
            { t: `p`, html: `<code>cd</code> changes the working directory; <code>cat hello.txt</code> shows the contents of the file in this folder. You've found your file. To go back up one folder, you can type <code>cd ..</code>.` },
            { t: `h`, text: `Step 3 — Choose where new work goes` },
            { t: `p`, html: `The flow in this step is for the real Claude Code you'll install in Module 2. For a new project, first create a folder with <code>mkdir my-first-project</code>; if the folder already exists, you don't need to create it again. While you're one level above the project folder, run these:` },
            { t: `code`, label: `Terminal`, code: `cd my-first-project\nclaude` },
            { t: `p`, html: `Once Claude opens, give it this instruction:` },
            { t: `code`, label: `To Claude`, code: `make a file called notes.md with three bullet points\nabout what I learned today` },
            { t: `p`, html: `Give approval if asked. Then leave Claude with <code>/exit</code> and check the file with <code>ls</code>. The file is expected to be in the project folder.` },
            { t: `h`, text: `Four commands worth remembering` },
            { t: `table`, head: [`Command`, `What it does`], rows: [
              [`<code>pwd</code>`, `Shows which folder you're in.`],
              [`<code>ls</code>`, `Lists the files and folders in that folder.`],
              [`<code>cd foldername</code>`, `Moves into the given folder.`],
              [`<code>cd ..</code>`, `Goes up one folder.`]
            ] },
            { t: `callout`, kind: `info`, title: `The Windows difference`, html: `In PowerShell, the <code>pwd</code> output may show a path such as <code>C:\\Users\\yourname</code> under a “Path” heading; <code>ls</code> gives a list in columns. On macOS and Linux it looks different. Options such as <code>ls -la</code> may not work the same way in PowerShell; <code>ls</code> is enough for this lesson.` }
          ],
          trouble: [
            { q: `A “folder already exists” message`, a: `Check that the folder is in the list with <code>ls</code>, then move into it with <code>cd</code>.` },
            { q: `A “path not found” message`, a: `Check where you are with <code>pwd</code> and what's in that folder with <code>ls</code>. Compare the folder name letter by letter.` }
          ],
          have: [
            `<code>pwd</code> shows your location, <code>ls</code> shows the contents; <code>cd</code> changes your location.`,
            `You saw that the file stays where it is even when the terminal moves to another folder.`,
            `You learned why it matters to use a separate folder for each project and to start Claude in that folder.`
          ],
          note: `In this lesson it became clear to me that the folder I start Claude in determines where files are saved.`,
          next: `Next: you'll learn how to stop the work and undo changes when Claude gets it wrong.`,
          prompt: `What does “working directory” mean in the terminal? Could you explain with a simple example where a file created with a relative path will be saved?`,
          sandbox: {
            cwd: `~`,
            dirs: [`~`, `~/Documents`, `~/Downloads`, `~/my-first-project`],
            files: { "~/my-first-project/hello.txt": `hello` },
            try: [
              { cmd: `pwd`, desc: `where am I?` },
              { cmd: `ls`, desc: `find the project folder` },
              { cmd: `cd my-first-project`, desc: `move into it` },
              { cmd: `cat hello.txt`, desc: `read the file` },
              { cmd: `cd ..`, desc: `go up one folder` }
            ]
          }
        },
        {
          id: `m1-d4`, title: `When Claude gets it wrong`, minutes: 6, ready: true,
          intro: [
            `Claude may misunderstand you, edit the wrong file, or produce a result that's close to what you expected but incomplete. What matters is checking the result and choosing the next step deliberately.`
          ],
          blocks: [
            { t: `callout`, kind: `info`, title: `In this lesson`, html: `You'll learn to stop the work, undo changes where appropriate, describe the problem clearly, and start again with a clean conversation when needed. In the practice terminal you'll try describing a problem you observed; the <code>Esc</code>, <code>/rewind</code> and <code>/clear</code> sections are for the real Claude Code session you'll install in Module 2.` },
            { t: `practice` },
            { t: `h`, text: `Step 1 — See the problem first` },
            { t: `p`, html: `In the practice environment, <code>poem.txt</code> has been created, but the file was left empty. Check its contents:` },
            { t: `cmd`, code: `cat poem.txt`, expect: `(prints nothing — the file is empty)` },
            { t: `p`, html: `Instead of just telling Claude “wrong”, describe what you see and what you expected together:` },
            { t: `cmd`, code: `claude "the file was created but it is empty; I expected the poem"` },
            { t: `p`, html: `Then give your request again clearly and read the result:` },
            { t: `cmd`, code: `claude "write a poem about the sea in a file called poem.txt"`, expect: `[OK] wrote poem.txt` },
            { t: `cmd`, code: `cat poem.txt` },
            { t: `h`, text: `Step 2 — Stop it mid-task` },
            { t: `p`, html: `If you notice an operation you don't want starting in a real Claude Code session, don't wait for it to finish. Interrupt the work with the <kbd>Esc</kbd> key. Then write clearly what you want to change; you don't need to restart the whole session.` },
            { t: `h`, text: `Step 3 — Undo changes` },
            { t: `p`, html: `To go back to an earlier point, press <kbd>Esc</kbd> twice while the input box is empty, or use this command:` },
            { t: `code`, label: `In the Claude session`, code: `/rewind` },
            { t: `p`, html: `In the menu that opens, choose the point you want to return to. Then you can choose to restore the files, the conversation, or both:` },
            { t: `table`, head: [`Option`, `What it does`], rows: [
              [`Restore code and conversation`, `Returns the tracked file changes and the conversation to the chosen point.`],
              [`Restore conversation`, `Returns the conversation to the chosen point; leaves the files as they are.`],
              [`Restore code`, `Undoes the tracked file changes; keeps the conversation.`],
              [`Never mind`, `Leaves the menu without changing anything.`]
            ] },
            { t: `p`, html: `If you want to go back to the state before the problem started in both the files and the conversation, use <strong>Restore code and conversation</strong>.` },
            { t: `callout`, kind: `warn`, title: `Undo is not a backup`, html: `Don't assume <code>/rewind</code> will undo every operation. File edits Claude makes directly and the effects of terminal commands are separate: operations done with commands such as delete, move or copy may fall outside checkpoint coverage. Think of checkpoints as a way back within the session; Git and backups are used for a permanent change history. Git is covered in Module 5.` },
            { t: `h`, text: `Step 4 — Say what you observed and what you expected` },
            { t: `p`, html: `If the result is close but not right, instead of “no, fix it” give two pieces of information: <strong>what you saw</strong> and <strong>what you expected</strong>.` },
            { t: `code`, label: `To Claude`, code: `the file was created but it is empty;\nI expected three bullet points in it` },
            { t: `p`, html: `This tells Claude concretely which result it needs to fix.` },
            { t: `h`, text: `Step 5 — If the same loop continues, start again` },
            { t: `p`, html: `A practical rule: if two attempts at a fix haven't worked, consider a clean start instead of stretching the same conversation. To clear the conversation:` },
            { t: `code`, label: `In the Claude session`, code: `/clear` },
            { t: `p`, html: `<code>/clear</code> clears the conversation context; it doesn't undo file changes. Then write your request again in a single, clear message, adding the requirements you learned from the failed attempts.` },
            { t: `h`, text: `Try it now: undo a change` },
            { t: `p`, html: `Do this exercise after the real Claude Code is installed, in a test folder that has no <code>poem.txt</code> file:` },
            { t: `steps`, items: [
              `Write to Claude: <code>write a poem about the sea in a file called poem.txt</code>`,
              `Wait for the file to be created and check its contents.`,
              `While the input box is empty, press <kbd>Esc</kbd> twice or type <code>/rewind</code>.`,
              `Choose the point before you asked for the file and go back with <strong>Restore code and conversation</strong>.`,
              `When you're back in the terminal, check the result with <code>ls</code>: if the file was created by an edit covered by the checkpoint, it should no longer appear in the list.`
            ] }
          ],
          trouble: [
            { q: `The rewind menu looks different`, a: `Menu names and shortcuts can change depending on the Claude Code version you use. Check the available commands with <code>/help</code>.` },
            { q: `I undid it but the file is still there`, a: `If the file was created by a terminal command, it may have fallen outside checkpoint coverage. In such cases you need Git and backups for a permanent way back.` }
          ],
          have: [
            `You learned to stop the work with <kbd>Esc</kbd>.`,
            `You learned to undo tracked changes with <code>/rewind</code>, and its limits.`,
            `You learned to describe a problem as “what I saw, what I expected”.`,
            `You learned to make a clean start with <code>/clear</code> if the loop continues.`
          ],
          note: `The distinction that stuck with me from this lesson: <kbd>Esc</kbd> stops, <code>/rewind</code> undoes tracked changes, <code>/clear</code> only clears the conversation.`,
          next: `Next: deciding which operations Claude can do without asking you first.`,
          prompt: `Could you explain the difference between Esc, /rewind and /clear in Claude Code, and when to use each one, in a table?`,
          sandbox: {
            cwd: `~/my-first-project`,
            dirs: [`~`, `~/Documents`, `~/Downloads`, `~/my-first-project`],
            files: { "~/my-first-project/poem.txt": `` },
            claude: [
              { match: `the file was created but it is empty; i expected the poem`, out: [`Got it: poem.txt was created but left empty.`, `If you want me to write the poem, ask again with the file name and the topic.`] },
              { match: `write a poem about the sea in a file called poem.txt`, write: { "~/my-first-project/poem.txt": `The sea is wide and blue,\nit hums a quiet tune,\nthe waves come in and go,\nbeneath the silver moon.` }, out: [`[OK] wrote poem.txt`] }
            ],
            try: [
              { cmd: `cat poem.txt`, desc: `is the file empty?` },
              { cmd: `claude "the file was created but it is empty; I expected the poem"`, desc: `describe what you saw` },
              { cmd: `claude "write a poem about the sea in a file called poem.txt"`, desc: `give the request clearly` },
              { cmd: `cat poem.txt`, desc: `read the result` }
            ]
          }
        },
        {
          id: `m1-d5`, title: `What Claude is allowed to do`, minutes: 5, ready: true,
          intro: [
            `Claude Code may ask for approval to change files or run commands. The approval screen is a chance to check the operation that's about to happen. But which operations are asked about depends on the selected permission mode and on permissions you've given before.`,
            `Instead of approving out of habit, read the proposed operation; in particular, try to understand which file will be affected and what the operation will do.`
          ],
          blocks: [
            { t: `h`, text: `Step 1 — Read the plan, not the impression` },
            { t: `list`, items: [
              `<strong>Which file?</strong> Look at the full path. A change to <code>notes.md</code> is not the same as a change to a <code>.env</code> file, which may contain access credentials.`,
              `<strong>Is something being deleted, moved or overwritten?</strong> Examine the scope of the operation. <code>/rewind</code> doesn't undo every operation; in particular, don't assume it will bring back the effects of terminal commands.`,
              `<strong>Is it an operation that surprises you?</strong> Don't approve it. First ask “What are you trying to achieve with this operation?”, or restate the scope you want.`
            ] },
            { t: `practice` },
            { t: `h`, text: `Step 2 — Create two files in the practice terminal` },
            { t: `p`, html: `First list the visible files, then ask Claude to create a README.md and a .gitignore:` },
            { t: `cmd`, code: `ls`, expect: `hello.txt` },
            { t: `cmd`, code: `claude "add a README.md describing this project, and a .gitignore"`, expect: `[OK] wrote README.md\n[OK] wrote .gitignore` },
            { t: `p`, html: `Now find both files and read the contents of <code>.gitignore</code>:` },
            { t: `cmd`, code: `ls`, expect: `README.md  hello.txt` },
            { t: `cmd`, code: `ls -a`, expect: `.  ..  .gitignore  README.md  hello.txt` },
            { t: `cmd`, code: `cat .gitignore` },
            { t: `callout`, kind: `info`, title: `Hidden files`, html: `In this simulation, names starting with a dot are hidden in the <code>ls</code> output; they appear with <code>ls -a</code>. In real PowerShell you can use <code>Get-ChildItem -Force</code> to show hidden items. On Windows, starting with a dot is not by itself the hidden file attribute.` },
            { t: `h`, text: `Step 3 — Get to know the permission modes` },
            { t: `p`, html: `In the flow the lesson describes, you switch between permission modes with <kbd>Shift</kbd> + <kbd>Tab</kbd>; the selected mode appears near the input box. The availability and behaviour of the modes can vary by version, account and settings.` },
            { t: `table`, head: [`Mode`, `Behaviour and use`], rows: [
              [`<code>default</code>`, `Asks for approval according to the permission rules. Gives a controlled start while you're learning; but don't assume it will always ask for every operation.`],
              [`<code>plan</code>`, `Used to examine and plan the task. You review the proposed approach before moving on to file changes.`],
              [`<code>acceptEdits</code>`, `Automatically allows file edits. Check the permissions for running commands separately; use it for work whose scope you know.`],
              [`<code>auto</code>`, `Described in the source lesson as a mode that puts actions through an automatic safety assessment and is available on some accounts.`]
            ] },
            { t: `h`, text: `Step 4 — Check the scope of “Always allow”` },
            { t: `p`, html: `Some approval screens offer to allow a certain type of action without asking again later. This can be useful for narrow, repetitive operations. Read which command, file path and duration the permission applies to; don't assume it's limited to the current session.` },
            { t: `p`, html: `Consider broad permissions that include deleting, moving or overwriting carefully: once you give the permission, you may not be asked for approval again within the same scope.` },
            { t: `h`, text: `Try it now: see the plan first` },
            { t: `p`, html: `Once the real Claude Code is installed, start it in the project folder, switch to plan mode with <kbd>Shift</kbd> + <kbd>Tab</kbd> and give this request:` },
            { t: `code`, label: `To Claude`, code: `add a README.md describing this project,\nand a .gitignore suitable for it` },
            { t: `p`, html: `First read the proposed files and their contents, then approve moving on to implementation. List the files that were created and check their contents. Reading the plan helps you catch a misunderstanding before any change is made.` }
          ],
          trouble: [
            { q: `.gitignore doesn't appear in the list`, a: `Files starting with a dot are hidden in the <code>ls</code> output. Try again with <code>ls -a</code>.` },
            { q: `The approval screen never appeared`, a: `The selected permission mode, or “always allow” permissions you gave earlier, may be letting some operations run automatically. Check the selected mode near the input box.` }
          ],
          have: [
            `You learned to read the file path and the scope of the operation on the approval screen.`,
            `You learned to see hidden files with <code>ls -a</code>.`,
            `You got to know the difference between the permission modes.`,
            `You learned to check the scope when giving a lasting permission.`
          ],
          note: `In this lesson I learned not to assume an approval screen will always appear before every operation; this behaviour is determined by the selected permission mode.`,
          next: `Next: the Module 1 summary and quick-reference tables.`,
          prompt: `Could you compare the permission modes in Claude Code (default, plan, acceptEdits) for a beginner? Which one should I choose in which situation?`,
          sandbox: {
            cwd: `~/my-first-project`,
            dirs: [`~`, `~/Documents`, `~/Downloads`, `~/my-first-project`],
            files: { "~/my-first-project/hello.txt": `hello` },
            claude: [
              { match: `add a readme.md describing this project, and a .gitignore`, write: { "~/my-first-project/README.md": `# my-first-project\n\nMy first project folder for the Claude Code course.`, "~/my-first-project/.gitignore": `.DS_Store\nThumbs.db\n.env` }, out: [`[OK] wrote README.md`, `[OK] wrote .gitignore`] }
            ],
            try: [
              { cmd: `ls`, desc: `what's there at the start?` },
              { cmd: `claude "add a README.md describing this project, and a .gitignore"`, desc: `ask for two files` },
              { cmd: `ls -a`, desc: `see hidden files too` },
              { cmd: `cat .gitignore`, desc: `read the contents` }
            ]
          }
        },
        {
          id: `m1-d6`, title: `Module 1 summary`, minutes: 3, ready: true,
          intro: [
            `You used the terminal, asked Claude to create a file, found the file and checked its contents. You learned how to stop the work when a result is wrong, the options for undoing, and why permissions matter.`,
            `Now you're ready to build on this foundation: Module 2 starts with installing Claude Code on your own computer. You can use this page as a quick reference while you work.`
          ],
          blocks: [
            { t: `h`, text: `Commands you'll use in your terminal` },
            { t: `table`, head: [`Command`, `What it does`], rows: [
              [`<code>claude</code>`, `Starts Claude Code in the folder you're in.`],
              [`<code>pwd</code>`, `Shows the working directory, that is, the folder you're in.`],
              [`<code>ls</code>`, `Lists the contents of the folder you're in.`],
              [`<code>cd foldername</code>`, `Moves into the given folder; <code>cd ..</code> goes up one folder.`],
              [`<code>mkdir name</code>`, `Creates a new folder.`],
              [`<code>cat file</code>`, `Shows the file's contents in the terminal.`]
            ] },
            { t: `h`, text: `Keys and commands in the Claude session` },
            { t: `table`, head: [`Key or command`, `What it does`], rows: [
              [`<kbd>Esc</kbd>`, `Interrupts the ongoing work.`],
              [`<kbd>Esc</kbd> <kbd>Esc</kbd> or <code>/rewind</code>`, `Opens the undo menu. For double <kbd>Esc</kbd>, the input box must be empty.`],
              [`<kbd>Shift</kbd> + <kbd>Tab</kbd>`, `Switches between permission modes.`],
              [`<code>/clear</code>`, `Clears the conversation context; doesn't undo file changes.`],
              [`<code>/exit</code>`, `Leaves the Claude Code session.`]
            ] },
            { t: `callout`, kind: `info`, title: `Note`, html: `These are the basic shortcuts described in the source lesson. The available options and behaviours may vary with the installed version and settings.` },
            { t: `h`, text: `Mental model: location, request, check` },
            { t: `p`, html: `The terminal has a working directory. Running the <code>claude</code> command in the project folder gives Claude a starting context for that project. <code>pwd</code> shows your location, <code>ls</code> shows the contents; with <code>cd</code> you move to another folder. Don't think of the project folder as a security boundary on its own: access to other locations may depend on permissions, added directories and sandbox settings.` },
            { t: `p`, html: `The working loop is simple: describe your request, review the proposal, have it applied with the appropriate permission, and check the result. When a result is wrong, stop the work, say what you observed, and use the appropriate undo method if needed.` },
            { t: `callout`, kind: `warn`, title: `Approval depends on the permissions you choose`, html: `Don't assume an approval screen will always appear before every operation. The permission mode and predefined rules may let some operations run automatically. Also, <code>/rewind</code> doesn't bring back the effect of every command, and <code>/clear</code> only clears the conversation; don't use these two in place of a backup system that protects your files.` },
            { t: `h`, text: `What you don't need to learn yet` },
            { t: `p`, html: `Topics such as <code>grep</code>, pipes, <code>chmod</code> and <code>PATH</code> are real and useful skills; but you don't need to learn them all in advance to start the first exercises. As the need arises, you can ask Claude what a command does and what its output means.` },
            { t: `p`, html: `The names and behaviour of these tools change depending on the shell you use. PowerShell, macOS/Linux shells and WSL are not the same environment; consider the examples in terms of your own environment.` },
            { t: `practice` }
          ],
          trouble: [],
          have: [
            `Finding where you are, listing folders and moving around.`,
            `Creating a project folder.`,
            `Asking Claude for a file and checking the file's contents.`,
            `Stopping work that's going wrong and using the undo options.`,
            `Assessing permission modes and the scope of the approvals you give.`
          ],
          note: `Location, request, check: first I know where I am, then I say clearly what I want, and finally I check the result myself.`,
          next: `Next: installing Claude Code on your own computer and starting to build your first web page.`,
          prompt: `In the first module of a Claude Code course I learned pwd, ls, cd, mkdir, cat, Esc, /rewind, /clear and the permission modes. Could you prepare a short 5-question review quiz on these topics? Give the answers at the end.`,
          sandbox: {
            cwd: `~`,
            dirs: [`~`, `~/Documents`, `~/Downloads`, `~/my-first-project`],
            files: { "~/my-first-project/hello.txt": `hello` },
            try: [
              { cmd: `pwd`, desc: `location` },
              { cmd: `ls`, desc: `contents` },
              { cmd: `cd my-first-project`, desc: `move into the folder` },
              { cmd: `cat hello.txt`, desc: `read the file` }
            ]
          }
        }
      ]
    },
    { id: `m2`, no: 2, title: `Your first prompt`, sub: `Install Claude Code and build your first page`, lessons: [
      {
        id: `m2-d1`, title: `Anatomy of a prompt`, minutes: 7, ready: true,
        intro: [
          `You did the Module 1 exercises in the practice terminal. In this lesson you'll install the real Claude Code on your own computer and, with a single sentence, create a web page you can open in your browser.`,
          `If Claude Code is already installed, run <code>claude --version</code>. If you see a version number, go straight to the “Your first page” step.`
        ],
        blocks: [
          { t: `callout`, kind: `info`, title: `Account requirement`, html: `To use Claude Code you need to sign in to Anthropic with a suitable Claude plan. Check the current plan and billing terms in your Anthropic account during installation.` },
          { t: `h`, text: `Step 1 — Open the terminal` },
          { t: `p`, html: `On Windows, press <kbd>Win</kbd> + <kbd>X</kbd> and choose <strong>Terminal</strong>. On some computers this option appears as <strong>Windows PowerShell</strong>. If the line starts with <code>PS</code>, you're in PowerShell. If you use Command Prompt (CMD), the install command is different; you'll find both in the next step.` },
          { t: `h`, text: `Step 2 — Run the official installer` },
          { t: `p`, html: `Choose the <strong>one</strong> command that matches your shell, copy it, paste it and press <kbd>Enter</kbd>. Both commands download and run the official installer.` },
          { t: `code`, label: `PowerShell`, code: `irm https://claude.ai/install.ps1 | iex` },
          { t: `code`, label: `CMD`, code: `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd` },
          { t: `p`, html: `Wait until the process finishes and the command line appears again. This lesson follows the Windows steps; the install command is different on macOS and Linux.` },
          { t: `h`, text: `Step 3 — Verify the installation` },
          { t: `cmd`, code: `claude --version`, expect: `2.x.x (Claude Code)` },
          { t: `p`, html: `You should see a version number and the name “Claude Code”; the number doesn't have to match the example here. If the command isn't found, close the terminal, open it again and retry.` },
          { t: `h`, text: `Step 4 — Prepare the project folder` },
          { t: `p`, html: `The folder in Module 1 was in the browser simulation; you need to create it separately on your real computer. Create the folder, move into it and start Claude:` },
          { t: `code`, label: `Terminal`, code: `mkdir my-first-project\ncd my-first-project\nclaude` },
          { t: `p`, html: `If the folder already exists, skip the <code>mkdir</code> step and check your location with <code>pwd</code>. If asked on the first run, sign in with your Claude account, then return to the terminal.` },
          { t: `h`, text: `Step 5 — Write your first real prompt` },
          { t: `p`, html: `Once Claude opens, send the request below as <strong>a single message</strong>. The lines are only split for readability. If you like, add your own name, the topic you're learning and three things you want to build to the message.` },
          { t: `code`, label: `To Claude`, code: `make a file called index.html - a simple one-page website about me,\nwith my name as a heading, a short paragraph about what I am learning,\nand a list of three things I want to build` },
          { t: `p`, html: `Review the proposed file change and approve it if asked. Then leave Claude with <code>/exit</code>.` },
          { t: `h`, text: `Step 6 — Open the page in your browser` },
          { t: `cmd`, code: `start index.html` },
          { t: `p`, html: `On Windows this command opens the file in its default application, usually the browser. Check that the page has a heading, a short paragraph and a three-item list.` },
          { t: `practice` },
          { t: `h`, text: `Why did this prompt work?` },
          { t: `p`, html: `The request reduced the points Claude would have had to guess. The template to keep in mind is simple: <strong>Where, what, and why when it matters?</strong>` },
          { t: `table`, head: [`Part`, `In this example`], rows: [
            [`Where`, `In a file called <code>index.html</code>.`],
            [`What`, `A one-page personal site with a heading, a short paragraph and a three-item list.`],
            [`Why`, `Not stated in this example. Add it if the purpose affects a design decision.`]
          ] },
          { t: `p`, html: `Compare it with a vague request:` },
          { t: `code`, label: `Vague request`, code: `make me a website` },
          { t: `p`, html: `In this request the topic, the file name, the sections and the look aren't defined. Claude chooses them itself; you may then have to fix details you didn't choose.` },
          { t: `h`, text: `“Why” helps with decisions` },
          { t: `code`, label: `To Claude`, code: `in index.html, make the text bigger and darker,\nbecause I am showing this to my grandmother\nand she finds it hard to read` },
          { t: `p`, html: `The reason steers not only the text size but also related decisions such as contrast and line spacing in the right direction.` },
          { t: `h`, text: `Try it now` },
          { t: `p`, html: `Start Claude again and use all three parts together:` },
          { t: `code`, label: `To Claude`, code: `in index.html, add a section at the bottom with a way to contact me,\nbecause I want to share this page with friends` },
          { t: `p`, html: `Refresh the page in your browser; check where the new section was added, its content and the contact details it uses.` }
        ],
        trouble: [
          { q: `“irm” or “&&” isn't recognised`, a: `Check that the command belongs to the shell you're using: <code>irm</code> is a PowerShell command; it doesn't work in CMD. <code>&&</code> isn't valid in older Windows PowerShell versions. If the line starts with <code>PS</code>, use the PowerShell command.` },
          { q: `The “claude” command can't be found`, a: `Close the terminal, open it again and retry <code>claude --version</code>. If the installer gave a PATH warning, follow its guidance.` },
          { q: `An SSL/TLS or other installation error`, a: `Don't try to turn off security checks. Read the error message and follow the guidance in the official installation documentation.` }
        ],
        have: [
          `A working Claude Code installation on your computer.`,
          `An <code>index.html</code> page in the <code>my-first-project</code> folder, created with a single sentence.`,
          `The template for a good request: where, what, and why when it matters.`
        ],
        note: `In this lesson I saw that adding the “why” to a request helps Claude make not only the requested change but also related decisions in the right direction.`,
        next: `Next: the practical way to ask for a clear change.`,
        prompt: `I'm learning to use the “where, what and why” template when giving Claude Code a task. How would I rewrite a vague request like “make me a website” with this template? Could you give 3 examples?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: {},
          cmds: [
            { match: `start index.html`, out: [`(simulation) index.html would open in your default browser.`, `Check that the page has a heading, a short paragraph and a three-item list.`] }
          ],
          claude: [
            { match: `make a file called index.html - a simple one-page website about me, with my name as a heading, a short paragraph about what I am learning, and a list of three things I want to build`,
              write: { "~/my-first-project/index.html": `<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8"><title>About me</title></head>\n<body>\n  <h1>Your Name</h1>\n  <p>I am learning to build websites with Claude Code.</p>\n  <ul>\n    <li>A personal website</li>\n    <li>A recipe collection</li>\n    <li>A small game</li>\n  </ul>\n</body>\n</html>` },
              out: [`[OK] wrote index.html`] },
            { match: `in index.html, add a section at the bottom with a way to contact me, because I want to share this page with friends`,
              write: { "~/my-first-project/index.html": `<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8"><title>About me</title></head>\n<body>\n  <h1>Your Name</h1>\n  <p>I am learning to build websites with Claude Code.</p>\n  <ul>\n    <li>A personal website</li>\n    <li>A recipe collection</li>\n    <li>A small game</li>\n  </ul>\n  <section>\n    <h2>Contact me</h2>\n    <p>Email: you@example.com</p>\n  </section>\n</body>\n</html>` },
              out: [`[OK] edited index.html — added a "Contact me" section at the bottom`] }
          ],
          try: [
            { cmd: `claude --version`, desc: `is it installed?` },
            { cmd: `claude "make a file called index.html - a simple one-page website about me, with my name as a heading, a short paragraph about what I am learning, and a list of three things I want to build"`, desc: `your first real prompt` },
            { cmd: `cat index.html`, desc: `read the file` },
            { cmd: `claude "in index.html, add a section at the bottom with a way to contact me, because I want to share this page with friends"`, desc: `where + what + why` },
            { cmd: `start index.html`, desc: `open in the browser` }
          ]
        }
      },
      {
        id: `m2-d2`, title: `The clarity lever`, minutes: 6, ready: true,
        intro: [
          `You know the shape of a prompt: where, what, and sometimes why. In this lesson you'll see how short but specific instructions make the result easier to check.`
        ],
        blocks: [
          { t: `h`, text: `Step 1 — First try a vague request` },
          { t: `code`, label: `To Claude`, code: `make my page better` },
          { t: `p`, html: `“Better” could mean colour, text, layout or spacing; Claude may change several of these at once. Open the result, look at it and ask yourself: Which of these changes did I actually want?` },
          { t: `p`, html: `To be able to compare, go back to the starting state: press <kbd>Esc</kbd> twice while the input box is empty or type <code>/rewind</code>, then choose the right earlier point and the <strong>Restore code and conversation</strong> option. Remember that undo only covers tracked changes.` },
          { t: `h`, text: `Step 2 — Name the change` },
          { t: `code`, label: `To Claude`, code: `in index.html, change the background to a light cream colour\nand make the heading font larger` },
          { t: `p`, html: `This time both the file and the two changes are clear. You can check the result by looking only at these two properties, instead of re-evaluating the whole page.` },
          { t: `practice` },
          { t: `h`, text: `Quick clarity check` },
          { t: `list`, items: [
            `<strong>Did you name the file?</strong>`,
            `<strong>Did you say what the actual change is?</strong>`,
            `<strong>If something new is being created, did you say where?</strong>`
          ] },
          { t: `p`, html: `Before sending, ask yourself: Does this instruction have a single reasonable interpretation? Being specific doesn't mean being long; you don't need to add a detail that doesn't change the result.` },
          { t: `h`, text: `What to write instead of vague words` },
          { t: `table`, head: [`Vague phrase`, `More useful direction`], rows: [
            [`“Make it better”`, `Name the property: colour, size, spacing or text.`],
            [`“Clean it up”`, `Say what's wrong right now.`],
            [`“Fix the style”`, `Describe what looks wrong and what you expect.`],
            [`“Add some content”`, `Specify the section and roughly what content to add.`]
          ] },
          { t: `h`, text: `If you don't know yet what you want` },
          { t: `p`, html: `If you can't choose the result, be specific about the process: ask Claude to review first and suggest options.` },
          { t: `code`, label: `To Claude`, code: `read index.html and tell me three things you would improve,\nand why - do not change anything yet` },
          { t: `p`, html: `Choose one of the suggestions and ask only for that change. The <strong>look first, then act</strong> pattern reduces sweeping changes you didn't want.` },
          { t: `h`, text: `Try it now` },
          { t: `steps`, items: [
            `Deliberately ask for a vague change and review the result.`,
            `Go back to the starting state with the appropriate undo method.`,
            `Ask for the same change again, naming the file and the property.`,
            `Compare the time you spent checking the two results.`
          ] }
        ],
        trouble: [
          { q: `Claude changed places I didn't want changed`, a: `Undo the change and narrow the request: write the file, the property to change and the part that must not be touched clearly. For example, “make the heading bigger, don't touch the paragraph text”.` },
          { q: `I undid it but the file didn't go back to how it was`, a: `<code>/rewind</code> only undoes tracked file edits. Changes made with terminal commands may fall outside its scope; open the file and check.` }
        ],
        have: [
          `You compared the results of a vague request and a clear one.`,
          `A three-question clarity check you can run before sending.`,
          `The “review first, suggest, don't change” pattern for when you don't know what you want.`
        ],
        note: `In this lesson I understood that clarity doesn't mean length: naming the file and the property to change is often enough.`,
        next: `Next: keeping the context focused as the conversation grows.`,
        prompt: `Could you help me turn vague requests like “make it better”, “clean it up” and “fix the style” into clearer instructions for a web page? Write one example for each.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8"><title>About me</title></head>\n<body>\n  <h1>Your Name</h1>\n  <p>I am learning to build websites with Claude Code.</p>\n</body>\n</html>` },
          claude: [
            { match: `make my page better`, write: { "~/my-first-project/index.html": `<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8"><title>Welcome!</title>\n<style>body{font-family:Georgia;background:#203040;color:#fff;padding:60px}h1{letter-spacing:4px}</style></head>\n<body>\n  <h1>YOUR NAME</h1>\n  <p>Hello and welcome to my brand new website, where I share my journey.</p>\n  <footer>Made with care</footer>\n</body>\n</html>` },
              out: [`[OK] edited index.html — changed the title, colours, font, heading text,`, `     rewrote the paragraph and added a footer`] },
            { match: `in index.html, change the background to a light cream colour and make the heading font larger`, write: { "~/my-first-project/index.html": `<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8"><title>About me</title>\n<style>body{background:#fdf6e3}h1{font-size:3rem}</style></head>\n<body>\n  <h1>Your Name</h1>\n  <p>I am learning to build websites with Claude Code.</p>\n</body>\n</html>` },
              out: [`[OK] edited index.html — background: light cream, heading: larger`] },
            { match: `read index.html and tell me three things you would improve, and why - do not change anything yet`,
              out: [`I haven't changed anything. Three suggestions:`, `1. Add a background colour — the page looks very plain right now.`, `2. Make the heading bigger — so the page's subject is clear at first glance.`, `3. Add a contact section — so visitors know how to reach you.`, `Which one would you like me to apply?`] }
          ],
          try: [
            { cmd: `cat index.html`, desc: `starting state` },
            { cmd: `claude "make my page better"`, desc: `vague request` },
            { cmd: `cat index.html`, desc: `what changed?` },
            { cmd: `claude "read index.html and tell me three things you would improve, and why - do not change anything yet"`, desc: `ask for suggestions first` },
            { cmd: `claude "in index.html, change the background to a light cream colour and make the heading font larger"`, desc: `clear request` }
          ]
        }
      },
      {
        id: `m2-d3`, title: `Context windows and /clear`, minutes: 5, ready: true,
        intro: [
          `The conversation and working information Claude can use while producing a response is called <strong>context</strong>. This space can be large, but it isn't unlimited; unrelated history can blur the focus of the task you're working on.`
        ],
        blocks: [
          { t: `h`, text: `What's in the context?` },
          { t: `p`, html: `Your messages, Claude's responses, the contents of files that were read and tool outputs all go into the context. In long sessions some information may be summarised; don't assume the history is always kept in full.` },
          { t: `callout`, kind: `info`, title: `A file and the conversation are not the same thing`, html: `A file's contents can enter the context when it's read. Clearing the conversation doesn't delete the file on disk.` },
          { t: `h`, text: `How can you tell the focus has drifted?` },
          { t: `list`, items: [
            `Claude keeps referring to an old task that's finished.`,
            `When you ask for a small change, it heads for unrelated files.`
          ] },
          { t: `p`, html: `These may point to context clutter, but that's not the only possible cause. First check that your request is clear and which file it targets.` },
          { t: `h`, text: `A clean start for a new task: /clear` },
          { t: `code`, label: `In the Claude session`, code: `/clear` },
          { t: `p`, html: `Clear the conversation when you move to an unrelated task. <code>/clear</code> doesn't touch files and doesn't undo earlier changes; it only clears the conversation context. If you're making small fixes on the same job, keeping the history can be useful; open a clean conversation when you really change task.` },
          { t: `h`, text: `Same task, long conversation: /compact` },
          { t: `code`, label: `In the Claude session`, code: `/compact` },
          { t: `p`, html: `If you're still on the same task and the conversation has grown long, you can continue by summarising it. That's what <code>/compact</code> is for. The summary is not a copy that keeps every detail of the earlier conversation.` },
          { t: `table`, head: [`Command`, `When to prefer it`], rows: [
            [`<code>/clear</code>`, `A new or unrelated task; you don't need the details of the earlier conversation.`],
            [`<code>/compact</code>`, `The same task continues; you want to summarise the useful history and free up space.`]
          ] },
          { t: `callout`, kind: `tip`, title: `The deciding question`, html: `“Will I use information from the earlier conversation in this task?” If yes, keep the context or use <code>/compact</code>; if no, start clean with <code>/clear</code>.` },
          { t: `practice` },
          { t: `h`, text: `Try it now` },
          { t: `steps`, items: [
            `Ask Claude to change the colours in <code>index.html</code>.`,
            `In the same conversation, ask for an unrelated file: a five-item <code>shopping-list.md</code>.`,
            `Then type <code>make the heading bigger</code> and observe which file Claude heads for.`,
            `Use <code>/clear</code>. This time state the target clearly: <code>in index.html, make the heading bigger</code>.`
          ] },
          { t: `p`, html: `The first vague request doesn't necessarily cause an error. The point is to observe the effect of old tasks and the difference that giving a clear file name makes.` }
        ],
        trouble: [
          { q: `After /clear, the change in the file didn't come back`, a: `That's the expected behaviour: <code>/clear</code> only clears the conversation; it doesn't touch files. Use <code>/rewind</code> to undo a change.` },
          { q: `After /compact, Claude forgot a detail`, a: `The summary doesn't keep every detail. Remind it of an important rule or decision in a short message.` }
        ],
        have: [
          `You know that context is the information used in the session, not the files on disk themselves.`,
          `You learned to use <code>/clear</code> between unrelated tasks and <code>/compact</code> in the same long task.`,
          `A single question to decide which one to choose.`
        ],
        note: `The deciding question for me was this: Do I need the information from the earlier conversation in this task? If not, <code>/clear</code>; if so, <code>/compact</code>.`,
        next: `Next: commonly used slash commands.`,
        prompt: `What is the context window in Claude Code? In which situations should I use the /clear and /compact commands? Could you explain with short examples?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Your Name</h1>\n<p>I am learning to build websites with Claude Code.</p>` },
          cmds: [
            { match: `/clear`, out: [`(simulation) Conversation context cleared. The files are as they were.`] },
            { match: `/compact`, out: [`(simulation) Conversation summarised; you can continue with the same task.`] }
          ],
          claude: [
            { match: `make a file called shopping-list.md with five items`, write: { "~/my-first-project/shopping-list.md": `# Shopping list\n\n- bread\n- milk\n- eggs\n- apples\n- coffee` }, out: [`[OK] wrote shopping-list.md`] },
            { match: `make the heading bigger`, out: [`Which heading do you mean? The last file we worked on is shopping-list.md;`, `should I enlarge its “# Shopping list” heading, or the heading in index.html?`] },
            { match: `in index.html, make the heading bigger`, write: { "~/my-first-project/index.html": `<h1 style="font-size:3rem">Your Name</h1>\n<p>I am learning to build websites with Claude Code.</p>` }, out: [`[OK] edited index.html — heading font-size: 3rem`] }
          ],
          try: [
            { cmd: `claude "make a file called shopping-list.md with five items"`, desc: `an unrelated task` },
            { cmd: `claude "make the heading bigger"`, desc: `vague request` },
            { cmd: `/clear`, desc: `clear the conversation` },
            { cmd: `claude "in index.html, make the heading bigger"`, desc: `state the target clearly` },
            { cmd: `ls`, desc: `are the files still there?` }
          ]
        }
      },
      {
        id: `m2-d4`, title: `Slash commands`, minutes: 5, ready: true,
        intro: [
          `You describe most of the jobs you give Claude in natural language. Slash commands, which start with <code>/</code>, are for managing the session: clearing the conversation, choosing the model, getting help or leaving.`
        ],
        blocks: [
          { t: `h`, text: `Step 1 — Find the commands` },
          { t: `p`, html: `Typing a single <code>/</code> opens a list of available commands. Keep typing to narrow the list; for example <code>/cl</code>. Since commands can vary by installation and version, look at the help screen:` },
          { t: `code`, label: `In the Claude session`, code: `/help` },
          { t: `h`, text: `Seven commands for day one` },
          { t: `table`, head: [`Command`, `What it does`], rows: [
            [`<code>/clear</code>`, `Clears the conversation context for a fresh start.`],
            [`<code>/compact</code>`, `Summarises the conversation to help you continue with the same task.`],
            [`<code>/rewind</code>`, `Opens the undo menu. <kbd>Esc</kbd> <kbd>Esc</kbd> does the same when the input box is empty.`],
            [`<code>/help</code>`, `Shows help and the available commands.`],
            [`<code>/model</code>`, `Lets you choose or change the active model.`],
            [`<code>/init</code>`, `Helps you create a <code>CLAUDE.md</code> guide that describes the project.`],
            [`<code>/exit</code>`, `Leaves the Claude Code session.`]
          ] },
          { t: `callout`, kind: `warn`, title: `Remember`, html: `<code>/clear</code> doesn't undo file changes. <code>/rewind</code> is not a backup that covers every effect of terminal commands.` },
          { t: `h`, text: `Step 2 — Describe the project once with /init` },
          { t: `code`, label: `In the Claude session`, code: `/init` },
          { t: `p`, html: `Start with this command in a project you'll come back to. Claude examines the project structure and prepares a <code>CLAUDE.md</code> file describing what the project is and how to work on it.` },
          { t: `p`, html: `If read or write permission is requested, review the operation and the file path. Always open and read the resulting file; fix any wrong or missing information. <code>CLAUDE.md</code> carries the project instructions into later sessions; when the rules in it are correct, you don't have to repeat the same explanations every session.` },
          { t: `h`, text: `Step 3 — Choose as needed with /model` },
          { t: `code`, label: `In the Claude session`, code: `/model` },
          { t: `p`, html: `Lets you choose among the models available on your account. Models can differ in speed, capability and usage cost. When starting out, you can stay with the default model.` },
          { t: `h`, text: `Slash command or natural language?` },
          { t: `table`, head: [`Situation`, `What to use`], rows: [
            [`You're managing the session`, `A command such as <code>/clear</code>, <code>/model</code> or <code>/exit</code>.`],
            [`You want a job done`, `A sentence such as “make the heading in index.html bigger”.`]
          ] },
          { t: `p`, html: `Don't assume there's a special slash command for every job. Some installations add custom commands or skills; check the current list with <code>/help</code>.` },
          { t: `practice` },
          { t: `h`, text: `Try it now` },
          { t: `p`, html: `Run <code>/init</code> in the project folder. Read the resulting <code>CLAUDE.md</code> file and edit one line so it describes the project the way you would.` }
        ],
        trouble: [
          { q: `I can't see a command in the list`, a: `Commands can vary by version and installation. Check the available commands with <code>/help</code>; update Claude Code if needed.` },
          { q: `There's wrong information in CLAUDE.md`, a: `Open the file and fix it. The guide Claude writes is a starting draft; checking it is your job.` }
        ],
        have: [
          `You know that slash commands manage the session, while jobs are requested in natural language.`,
          `You learned what the seven day-one commands do.`,
          `You can create a <code>CLAUDE.md</code> that describes your project once, with <code>/init</code>.`
        ],
        note: `I saw that reading and fixing the <code>CLAUDE.md</code> created by <code>/init</code>, instead of leaving it as it is, saves time in later sessions. This site has a <code>CLAUDE.md</code> file too.`,
        next: `Next: pointing Claude at the right file and folder with <code>@</code>.`,
        prompt: `Could you compare the /clear, /compact, /rewind, /help, /model, /init and /exit commands in Claude Code in a table? Give a usage example for each.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Your Name</h1>\n<p>I am learning to build websites with Claude Code.</p>` },
          cmds: [
            { match: `/help`, out: [`(simulation) Some of the available commands:`, `  /clear  /compact  /rewind  /help  /model  /init  /exit`, `The real list may have more commands depending on your installation.`] },
            { match: `/init`, claude: true, write: { "~/my-first-project/CLAUDE.md": `# my-first-project\n\nA simple personal website made while learning Claude Code.\n\n## Files\n- index.html: the one-page site\n\n## How to view\nOpen index.html in a browser.` }, out: [`[OK] wrote CLAUDE.md — I examined the project and prepared a draft guide.`, `Please read the file and fix any wrong or missing information.`] },
            { match: `/model`, out: [`(simulation) The models available on your account are listed here.`, `When starting out, you can stay with the default model.`] },
            { match: `/exit`, out: [`(simulation) Left the Claude Code session.`] }
          ],
          try: [
            { cmd: `/help`, desc: `see the commands` },
            { cmd: `/init`, desc: `create CLAUDE.md` },
            { cmd: `cat CLAUDE.md`, desc: `read the guide` },
            { cmd: `/model`, desc: `model choice` }
          ]
        }
      },
      {
        id: `m2-d5`, title: `@file and @directory`, minutes: 5, ready: true,
        intro: [
          `Pointing at a file with <code>@</code> directs Claude to a specific source related to your request. This is especially useful when changing a file, comparing two sources or having an example's format followed.`
        ],
        blocks: [
          { t: `h`, text: `Step 1 — Point at a file` },
          { t: `p`, html: `First ask Claude to create a second file:` },
          { t: `code`, label: `To Claude`, code: `make a file called about.md\nwith a few paragraphs about what I am learning` },
          { t: `p`, html: `Now you can talk about <code>index.html</code> and <code>about.md</code> separately:` },
          { t: `code`, label: `To Claude`, code: `explain what @about.md says, in one sentence` },
          { t: `p`, html: `Typing <code>@</code> may open a file picker. Narrow the list with a few letters such as <code>@ab</code>, choose the file with the arrow keys and complete it with <kbd>Tab</kbd> or <kbd>Enter</kbd>. After choosing, check that the path is right.` },
          { t: `h`, text: `Step 2 — Use a file as a pattern` },
          { t: `code`, label: `To Claude`, code: `using @index.html as the pattern,\nmake a second page called projects.html with the same styling` },
          { t: `p`, html: `In the result, check that the font, colours and spacing match.` },
          { t: `callout`, kind: `info`, title: `Is @ required?`, html: `Claude can sometimes find and read the relevant file without <code>@</code>. The benefit of using <code>@</code> is that you state clearly which source you mean.` },
          { t: `h`, text: `Step 3 — Point at a folder` },
          { t: `p`, html: `If you don't know which file has the answer, you can point at a folder within the project. For example, if you have a <code>pages/</code> folder:` },
          { t: `code`, label: `To Claude`, code: `look through @pages/\nand tell me which files mention my name` },
          { t: `p`, html: `Choosing a folder doesn't mean everything in it will be loaded in full; Claude may need to examine the relevant files separately. The scope of access depends on permissions and settings.` },
          { t: `practice` },
          { t: `h`, text: `Use context sparingly` },
          { t: `p`, html: `Files that are read and tool outputs take up space in the context. Having a broad folder examined takes more work and context than showing a single relevant file.` },
          { t: `list`, items: [
            `Point at one or two important files.`,
            `If you know where to look, choose the relevant file instead of a broad folder.`,
            `In long files, also give the name of the relevant section or the question you're looking for.`
          ] },
          { t: `callout`, kind: `tip`, title: `An analogy`, html: `Sharing a single relevant document in a meeting increases focus; emptying the whole filing cabinet onto the table doesn't do the same job.` },
          { t: `h`, text: `Is it needed in every message?` },
          { t: `p`, html: `If you keep working on the same file, you don't need to add <code>@</code> every time. Use it again when you change files, compare two sources or clear up a misunderstanding.` },
          { t: `h`, text: `Try it now` },
          { t: `code`, label: `To Claude`, code: `compare @index.html and @about.md -\nis anything said differently between them?` },
          { t: `p`, html: `Are your name, the topics you're learning or the projects you want to build described differently in the two files? Compare the findings in the response with the files yourself by opening them.` }
        ],
        trouble: [
          { q: `The file picker doesn't open when I type @`, a: `You can type the file name by hand as <code>@about.md</code>. Check with <code>pwd</code> that you started Claude in the project folder.` },
          { q: `Claude looked at the wrong file`, a: `Check the chosen path and send the request again with the right file. If there's more than one file with the same name, include the folder path too.` }
        ],
        have: [
          `You learned to direct Claude to a specific source with <code>@file</code>.`,
          `You can use one file as a pattern for a new page.`,
          `You learned to use context sparingly by choosing the relevant file instead of a broad folder.`
        ],
        note: `I saw that choosing a file clearly with <code>@</code> helps not only Claude but me too: I know what to look at when I check the result.`,
        next: `Next: the Module 2 summary and quick-reference table.`,
        prompt: `What's the benefit of giving context with @file and @folder in Claude Code? Could you give 3 practical tips for using context sparingly?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Your Name</h1>\n<p>I am learning to build websites with Claude Code.</p>\n<ul><li>A personal website</li><li>A recipe collection</li><li>A small game</li></ul>` },
          claude: [
            { match: `make a file called about.md with a few paragraphs about what I am learning`, write: { "~/my-first-project/about.md": `# About\n\nI am learning how to use the terminal and Claude Code.\n\nMy goal is to publish my own website.` }, out: [`[OK] wrote about.md`] },
            { match: `explain what @about.md says, in one sentence`, out: [`about.md says you're learning the terminal and Claude Code and that your goal is to publish your own site.`] },
            { match: `using @index.html as the pattern, make a second page called projects.html with the same styling`, write: { "~/my-first-project/projects.html": `<h1>Projects</h1>\n<p>Things I want to build.</p>\n<ul><li>A personal website</li><li>A recipe collection</li><li>A small game</li></ul>` }, out: [`[OK] wrote projects.html — same structure and style as index.html`] },
            { match: `compare @index.html and @about.md - is anything said differently between them?`, out: [`index.html lists the three projects you want to build; about.md doesn't mention them.`, `about.md describes your goal of publishing your site; that information isn't in index.html.`] }
          ],
          try: [
            { cmd: `claude "make a file called about.md with a few paragraphs about what I am learning"`, desc: `a second file` },
            { cmd: `claude "explain what @about.md says, in one sentence"`, desc: `point at the file` },
            { cmd: `claude "using @index.html as the pattern, make a second page called projects.html with the same styling"`, desc: `use it as a pattern` },
            { cmd: `claude "compare @index.html and @about.md - is anything said differently between them?"`, desc: `compare two files` },
            { cmd: `ls`, desc: `which files are there?` }
          ]
        }
      },
      {
        id: `m2-d6`, title: `Module 2 summary`, minutes: 3, ready: true,
        intro: [
          `You learned to create a web page from a sentence, describe the change you want clearly, and manage the conversation context. This module laid the foundation for communicating effectively with Claude.`
        ],
        blocks: [
          { t: `h`, text: `Module 2 quick reference` },
          { t: `table`, head: [`Idea`, `Practical move`], rows: [
            [`Anatomy of a prompt`, `Answer where, what, and why when it matters.`],
            [`Clarity`, `Aim for a single reasonable interpretation; name the file and the change.`],
            [`When you don't know`, `Ask it to review and make suggestions before changing anything.`],
            [`Context window`, `The information used in the session; not the files on disk themselves.`],
            [`<code>/clear</code>`, `Clear the conversation context when moving to an unrelated task.`],
            [`<code>/compact</code>`, `Continue by summarising a long conversation on the same task.`],
            [`<code>/init</code>`, `Helps you create a <code>CLAUDE.md</code> that describes the project.`],
            [`<code>@file</code>`, `Direct your request clearly to the relevant file; check the chosen path.`]
          ] },
          { t: `h`, text: `Mental model` },
          { t: `p`, html: `A good prompt is <strong>specific about the work and sparing with context</strong>. Choose deliberately what you want to change, which files are relevant, and whether you still need the old conversation.` },
          { t: `p`, html: `The common problem isn't only a badly written sentence: a vague request sent into a cluttered conversation also makes the result harder.` },
          { t: `h`, text: `Two habits worth keeping` },
          { t: `p`, html: `<strong>1. Look before you leap.</strong> If you're not sure, ask Claude to read and make suggestions instead of changing anything. First see the options, then choose which change is made.` },
          { t: `code`, label: `To Claude`, code: `read @index.html and suggest three improvements;\ndo not change anything yet` },
          { t: `p`, html: `<strong>2. Be specific about names.</strong> Instead of “better” or “clean up”, give the colour, heading, spacing, section and file name. An instruction people would understand differently is vague for Claude too.` },
          { t: `code`, label: `To Claude`, code: `in index.html, increase the main heading size\nand leave the paragraph text unchanged` },
          { t: `h`, text: `A short check before you start` },
          { t: `list`, items: [
            `Which file or folder will be worked on?`,
            `What exactly will change?`,
            `Does the purpose affect the choice?`,
            `Is there relevant context, or should a new conversation be opened?`,
            `How will you check that the result is right?`
          ] },
          { t: `practice` }
        ],
        trouble: [],
        have: [
          `Writing prompts that reduce guessing.`,
          `Choosing between <code>/clear</code> and <code>/compact</code> as needed.`,
          `Directing to the right file with <code>@</code>.`,
          `Asking for review first, implementation second.`,
          `Opening the web page on your own computer and checking the changes.`
        ],
        note: `Specific about the work, sparing with context: that's the one sentence that stuck with me from this module.`,
        next: `Next: using these communication habits to make changes to real code and read diffs.`,
        prompt: `In the second module of a Claude Code course I learned about writing prompts (where/what/why), clarity, /clear, /compact, /init and using @file. Could you prepare a short 5-question review quiz on these topics? Give the answers at the end.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Your Name</h1>\n<p>I am learning to build websites with Claude Code.</p>` },
          claude: [
            { match: `read @index.html and suggest three improvements; do not change anything yet`, out: [`I haven't changed anything. Three suggestions:`, `1. Make the heading bigger.`, `2. Add the projects you want to build as a list.`, `3. Add a contact section at the bottom.`] },
            { match: `in index.html, increase the main heading size and leave the paragraph text unchanged`, write: { "~/my-first-project/index.html": `<h1 style="font-size:3rem">Your Name</h1>\n<p>I am learning to build websites with Claude Code.</p>` }, out: [`[OK] edited index.html — heading larger, paragraph unchanged`] }
          ],
          try: [
            { cmd: `claude "read @index.html and suggest three improvements; do not change anything yet"`, desc: `look first` },
            { cmd: `claude "in index.html, increase the main heading size and leave the paragraph text unchanged"`, desc: `be specific` },
            { cmd: `cat index.html`, desc: `check the result` }
          ]
        }
      }
    ] },
    { id: `m3`, no: 3, title: `Single-file edits`, sub: `Read the diff, decide, check the result`, lessons: [
      {
        id: `m3-d1`, title: `Reading a diff`, minutes: 5, ready: true,
        intro: [
          `When changing a file, the most important habit to build is reading the proposed change. A <strong>diff</strong> shows the difference between the old and new content line by line.`
        ],
        blocks: [
          { t: `callout`, kind: `warn`, title: `An approval screen may not always appear`, html: `In a permission mode that asks for approval, Claude shows the proposal and waits for your decision. If automatic edit permissions are on, the change may already have been applied; don't assume you'll see an approval screen every time.` },
          { t: `h`, text: `Step 1 — Ask for a small change` },
          { t: `code`, label: `Terminal`, code: `cd my-first-project\nclaude` },
          { t: `code`, label: `To Claude`, code: `in index.html, change my main heading to say hello and then my name` },
          { t: `p`, html: `If an approval screen appears, <strong>don't accept it yet</strong>. First read the file name and the changed lines.` },
          { t: `h`, text: `Step 2 — Read the diff` },
          { t: `diff`, label: `index.html`, lines: [`  <body>`, `- <h1>My name</h1>`, `+ <h1>Hello, I'm Ayşe</h1>`, `  <p>I am learning to build websites.</p>`] },
          { t: `list`, items: [
            `A line starting with <code>-</code> is <strong>removed</strong>.`,
            `A line starting with <code>+</code> is <strong>added</strong>.`,
            `Unmarked <strong>context lines</strong> show the content around the change that stays the same; they help you see where in the file the change is.`
          ] },
          { t: `p`, html: `This example replaces one heading line with a new one. Don't conclude from a single hunk that the rest of the file is unchanged; check the other blocks in the proposal too.` },
          { t: `practice` },
          { t: `h`, text: `Step 3 — The options on the approval screen` },
          { t: `table`, head: [`Option`, `Meaning`], rows: [
            [`Yes`, `Applies the proposed change.`],
            [`Yes, and switch to accept edits`, `Applies the change and switches to the mode that accepts file edits automatically. Check how permissions will behave next.`],
            [`No`, `Rejects the pending proposal.`]
          ] },
          { t: `p`, html: `Menu text and keys can vary by version. If the edit is right, approve it; then leave with <code>/exit</code> and open the page:` },
          { t: `cmd`, code: `start index.html` },
          { t: `p`, html: `Check that the heading changed the way you wanted and that the other sections stayed as they were.` },
          { t: `h`, text: `Scan a large diff in this order` },
          { t: `steps`, items: [
            `<strong>Which file?</strong> Did the change stay in the files you asked for?`,
            `<strong>How much change?</strong> Is the scope proportionate to your request?`,
            `<strong>What's being removed?</strong> Is content you want to keep being deleted?`
          ] },
          { t: `p`, html: `If you see an unexpectedly large diff for a small request, ask for an explanation or narrow the job. The number of lines alone isn't proof of an error; it's a sign that you need to examine the scope.` }
        ],
        trouble: [
          { q: `No approval screen appeared; the change was applied directly`, a: `The selected permission mode may be accepting file edits automatically. Check the mode near the input box; also examine the applied change in the diff or by opening the file.` },
          { q: `There are lines in the diff I didn't expect`, a: `Don't accept the proposal. Choose <strong>No</strong> and write a short note on what shouldn't change, or ask Claude to explain the change.` }
        ],
        have: [
          `<code>-</code> shows what's removed, <code>+</code> what's added; context lines show the location.`,
          `You know the difference between the three options on the approval screen.`,
          `You can scan a large diff in the order: file, scope, removed content.`
        ],
        note: `I made a note to look at the minus lines in a diff first: what's going to be deleted can be more of a surprise than what's going to be added.`,
        next: `Next: accepting, adjusting or rejecting a pending proposal.`,
        prompt: `How do I read a diff? Could you explain lines starting with minus and plus, and context lines, using a small HTML example?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<body>\n  <h1>My name</h1>\n  <p>I am learning to build websites.</p>\n</body>` },
          cmds: [
            { match: `start index.html`, out: [`(simulation) index.html would open in your default browser.`] }
          ],
          claude: [
            { match: `in index.html, change my main heading to say hello and then my name`, write: { "~/my-first-project/index.html": `<body>\n  <h1>Hello, I'm Ayşe</h1>\n  <p>I am learning to build websites.</p>\n</body>` },
              out: [`Proposed change — index.html:`, `  <body>`, `- <h1>My name</h1>`, `+ <h1>Hello, I'm Ayşe</h1>`, `  <p>I am learning to build websites.</p>`, `(simulation: proposal accepted)`, `[OK] edited index.html`] }
          ],
          try: [
            { cmd: `cat index.html`, desc: `before` },
            { cmd: `claude "in index.html, change my main heading to say hello and then my name"`, desc: `see the diff` },
            { cmd: `cat index.html`, desc: `after` }
          ]
        }
      },
      {
        id: `m3-d2`, title: `Accepting and adjusting edits`, minutes: 3, ready: true,
        intro: [
          `A proposed diff is an offer. With an edit waiting for approval, you choose the next step: accept, adjust or reject.`
        ],
        blocks: [
          { t: `h`, text: `Your three options` },
          { t: `table`, head: [`Response`, `What you do`], rows: [
            [`Accept`, `Have the right change applied.`],
            [`Adjust`, `Reject the pending proposal and describe a small adjustment.`],
            [`Reject`, `Leave a proposal you don't want unapplied.`]
          ] },
          { t: `callout`, kind: `info`, title: `Automatic permissions`, html: `If automatic edit permissions are on, the file may have changed before your decision. Check the selected mode.` },
          { t: `h`, text: `A small correction instead of explaining from scratch` },
          { t: `code`, label: `To Claude`, code: `in index.html, make my heading bigger` },
          { t: `p`, html: `The diff may be heading in the right direction, but the heading may be too big. In that case, move to the <strong>No</strong> option and open the feedback field with <kbd>Tab</kbd>. If the menu is different, use the available explanation or feedback option. Then write only the correction:` },
          { t: `code`, label: `Feedback`, code: `a little smaller` },
          { t: `p`, html: `Short corrections such as “keep the colour” or “leave the paragraph alone” keep you on the same target. Read and assess the new diff too.` },
          { t: `practice` },
          { t: `h`, text: `Small steps, frequent checks` },
          { t: `p`, html: `Instead of accepting a large change without reading it, ask for steps you can check one by one. That way, if a problem appears, it's easier to find which change caused it.` },
          { t: `h`, text: `Try it now` },
          { t: `code`, label: `To Claude`, code: `in index.html, add a short sentence under my heading welcoming visitors` },
          { t: `p`, html: `Ask for three small changes to your page one at a time. Read each proposal and adjust at least one of them with a short correction. Then open the page and check that the result matches the decisions you made.` }
        ],
        trouble: [
          { q: `I can't find the feedback field`, a: `The menu can vary by version. Reject the proposal and write the correction as a short sentence in your next message.` },
          { q: `Other things changed too after the correction`, a: `Reject the new diff and add clearly what shouldn't change; for example “only change the font size”.` }
        ],
        have: [
          `You can accept, adjust or reject a pending proposal.`,
          `You learned to adjust a proposal with short feedback instead of explaining from scratch.`,
          `You saw the benefit of keeping changes small and reviewable.`
        ],
        note: `In this lesson I saw that a two-word correction like “a little smaller” gets a result much faster than rewriting the request.`,
        next: `Next: asking for an explanation before changing anything.`,
        prompt: `How do I decide between accepting a pending edit proposal in Claude Code, adjusting it with short feedback, and rejecting it? Could you explain with simple examples?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>\n<p>I am learning to build websites.</p>` },
          claude: [
            { match: `in index.html, make my heading bigger`, out: [`Proposed change — index.html:`, `- <h1>Hello, I'm Ayşe</h1>`, `+ <h1 style="font-size:5rem">Hello, I'm Ayşe</h1>`, `(proposal pending — instead of accepting, you can write a short correction)`] },
            { match: `a little smaller`, write: { "~/my-first-project/index.html": `<h1 style="font-size:3rem">Hello, I'm Ayşe</h1>\n<p>I am learning to build websites.</p>` }, out: [`Updated proposal — index.html:`, `- <h1>Hello, I'm Ayşe</h1>`, `+ <h1 style="font-size:3rem">Hello, I'm Ayşe</h1>`, `(simulation: proposal accepted)`, `[OK] edited index.html`] },
            { match: `in index.html, add a short sentence under my heading welcoming visitors`, write: { "~/my-first-project/index.html": `<h1 style="font-size:3rem">Hello, I'm Ayşe</h1>\n<p>Welcome, thanks for stopping by!</p>\n<p>I am learning to build websites.</p>` }, out: [`Proposed change — index.html:`, `  <h1 style="font-size:3rem">Hello, I'm Ayşe</h1>`, `+ <p>Welcome, thanks for stopping by!</p>`, `(simulation: proposal accepted)`, `[OK] edited index.html`] }
          ],
          try: [
            { cmd: `claude "in index.html, make my heading bigger"`, desc: `see the proposal` },
            { cmd: `claude "a little smaller"`, desc: `short correction` },
            { cmd: `claude "in index.html, add a short sentence under my heading welcoming visitors"`, desc: `the next small step` },
            { cmd: `cat index.html`, desc: `check the result` }
          ]
        }
      },
      {
        id: `m3-d3`, title: `Asking for explanations`, minutes: 2, ready: true,
        intro: [
          `Use Claude not only to change files but also to understand them. Before changing a part you don't understand, ask what it does.`
        ],
        blocks: [
          { t: `h`, text: `Step 1 — First have the real file explained` },
          { t: `code`, label: `To Claude`, code: `explain what @index.html does, in plain language, section by section` },
          { t: `p`, html: `With <code>@index.html</code> you point at the relevant file; you learn in plain language what the heading, the paragraphs and the styles are for.` },
          { t: `h`, text: `Three questions worth keeping` },
          { t: `list`, items: [
            `<code>Explain @index.html like I have never seen HTML before.</code>`,
            `<code>What would happen to my page if I deleted this part?</code>`,
            `<code>Why is this written this way instead of something simpler?</code>`
          ] },
          { t: `p`, html: `When you use phrases like “this part”, also include the relevant code or the section's name. An explanation brings out possible design reasons; still, compare the reasoning with the file and with how the page behaves.` },
          { t: `practice` },
          { t: `h`, text: `Step 2 — Ask for an explanation before accepting a diff` },
          { t: `p`, html: `If you're not sure about a pending proposal, use <strong>No</strong> and the feedback option (in most versions it opens with <kbd>Tab</kbd> while <strong>No</strong> is selected) and write:` },
          { t: `code`, label: `Feedback`, code: `before I approve, walk me through what this change does\nand what might look different on my page` },
          { t: `p`, html: `If the explanation doesn't match what you asked for, narrow the proposal or reject it. Also review the diff presented again after the explanation; don't assume it's the same as before.` },
          { t: `h`, text: `Try it now` },
          { t: `p`, html: `Have your page explained from start to finish. Then ask “Why is it written like this?” about a single section. Compare the explanation you get with the result in the browser.` }
        ],
        trouble: [
          { q: `The explanation was too technical`, a: `State the level: an addition such as “like I have never seen HTML before” or “in two sentences” simplifies the explanation.` },
          { q: `The explanation doesn't match the file`, a: `Open the file, show the relevant line and ask again. An explanation helps you decide but doesn't replace checking the file itself.` }
        ],
        have: [
          `You learned to have a file explained section by section.`,
          `You have three question patterns worth keeping.`,
          `You can ask for an explanation before approving a pending diff.`
        ],
        note: `Understand first, then change: I noted asking “what happens if I delete this?” before deleting a section as a habit I took from this lesson.`,
        next: `Next: tidying code without changing how it looks.`,
        prompt: `Could you explain what the <head>, <body>, <h1>, <p> and <style> parts of a simple HTML page do, as if to someone who has never seen HTML?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<style>h1 { color: #b33; }</style>\n<h1>Hello, I'm Ayşe</h1>\n<p>Welcome, thanks for stopping by!</p>` },
          claude: [
            { match: `explain what @index.html does, in plain language, section by section`, out: [`index.html has three parts:`, `1. <style>: The page's appearance rules. Here it makes the heading red.`, `2. <h1>: The page's main heading — the big text a visitor sees first.`, `3. <p>: The welcome paragraph under the heading.`] },
            { match: `what would happen to my page if I deleted the style part?`, out: [`If you delete the <style> part, the heading stops being red and appears in the browser's default colour (usually black).`, `The text and the page's structure don't change.`] }
          ],
          try: [
            { cmd: `claude "explain what @index.html does, in plain language, section by section"`, desc: `have the file explained` },
            { cmd: `claude "what would happen to my page if I deleted the style part?"`, desc: `ask before deleting` },
            { cmd: `cat index.html`, desc: `compare the explanation with the file` }
          ]
        }
      },
      {
        id: `m3-d4`, title: `Small refactors`, minutes: 5, ready: true,
        intro: [
          `A refactor reorganises the internal structure of code while keeping its externally visible behaviour. On the web page in this lesson, the goal is to tidy the code without changing how it looks or works.`
        ],
        blocks: [
          { t: `h`, text: `Common tidy-ups` },
          { t: `table`, head: [`Operation`, `Meaning`], rows: [
            [`Rename`, `Give an item a clearer name everywhere it's used.`],
            [`Extract`, `Gather a repeated value or structure in one place.`],
            [`Simplify`, `Make code that does the same job easier to understand.`]
          ] },
          { t: `h`, text: `Step 1 — Make a small, specific request` },
          { t: `code`, label: `To Claude`, code: `in index.html, put the colours in named variables\nat the top of the style block,\nwithout changing how the page looks` },
          { t: `p`, html: `If a colour is used in more than one place, inconsistencies can creep in when you change it later. Named CSS variables gather shared values in one place.` },
          { t: `diff`, label: `index.html — example`, lines: [`  <style>`, `+   :root { --brand: #b33; }`, `-   h1 { color: #b33; }`, `+   h1 { color: var(--brand); }`, `-   a { color: #b33; }`, `+   a { color: var(--brand); }`, `  </style>`] },
          { t: `h`, text: `Step 2 — Read the diff` },
          { t: `list`, items: [
            `Are the variables defined with the right values?`,
            `Is every use linked to the right variable?`,
            `Is there any new content or unexpected change in appearance?`
          ] },
          { t: `practice` },
          { t: `h`, text: `Step 3 — Verify the appearance and behaviour` },
          { t: `cmd`, code: `start index.html` },
          { t: `p`, html: `Open the page or refresh the open tab. Are the colours, font sizes, spacing and links as before? If needed, also look at different window widths.` },
          { t: `p`, html: `If something changed unexpectedly, stop. Examine which change caused it; if there's a suitable checkpoint, go back with <code>/rewind</code>, or fix it by comparing with the previous version.` },
          { t: `callout`, kind: `tip`, title: `Keep tidying separate from new features`, html: `If you both reorganise code and add a new feature in the same step, it gets harder to isolate the source of a problem when one appears. Do the two jobs in separate, reviewable steps.` },
          { t: `h`, text: `Try it now` },
          { t: `code`, label: `To Claude`, code: `read @index.html and suggest three small tidy-ups\nthat would not change how the page looks;\ndo not change anything yet` },
          { t: `steps`, items: [
            `Read the suggestions.`,
            `Choose one small tidy-up.`,
            `Have only that one applied and review the diff.`,
            `Open the page and verify that the appearance and behaviour are preserved.`
          ] }
        ],
        trouble: [
          { q: `The page's appearance changed after the refactor`, a: `Check the values of the variables and where they're used in the diff. If needed, go back with <code>/rewind</code> and try again, keeping the “without changing how the page looks” addition in the request.` },
          { q: `Claude added new things along with the refactor`, a: `Reject the proposal and narrow the request: “only move the colours into variables; do not add anything new”.` }
        ],
        have: [
          `You know that a refactor is an internal reorganisation that keeps appearance and behaviour.`,
          `You saw colours gathered into named CSS variables.`,
          `You learned to do tidying in a separate step from new features.`
        ],
        note: `This site's colours also live in CSS variables; that's what lets me change the light and dark themes from one place.`,
        next: `Next: the Module 3 summary.`,
        prompt: `Why is it useful to move colours into variables (custom properties) in CSS? Could you show a before/after with a simple example?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<style>\n  h1 { color: #b33; }\n  a { color: #b33; }\n</style>\n<h1>Hello, I'm Ayşe</h1>\n<a href="about.html">About me</a>` },
          cmds: [
            { match: `start index.html`, out: [`(simulation) index.html would open in the browser. Are the colours as before? Check.`] }
          ],
          claude: [
            { match: `read @index.html and suggest three small tidy-ups that would not change how the page looks; do not change anything yet`, out: [`I haven't changed anything. Three tidy-ups that won't change the appearance:`, `1. Gather the repeated #b33 colour into a variable.`, `2. Wrap the heading and the link in a <main>.`, `3. Put the style rules in alphabetical order.`] },
            { match: `in index.html, put the colours in named variables at the top of the style block, without changing how the page looks`, write: { "~/my-first-project/index.html": `<style>\n  :root { --brand: #b33; }\n  h1 { color: var(--brand); }\n  a { color: var(--brand); }\n</style>\n<h1>Hello, I'm Ayşe</h1>\n<a href="about.html">About me</a>` },
              out: [`Proposed change — index.html:`, `  <style>`, `+   :root { --brand: #b33; }`, `-   h1 { color: #b33; }`, `+   h1 { color: var(--brand); }`, `-   a { color: #b33; }`, `+   a { color: var(--brand); }`, `  </style>`, `(simulation: proposal accepted)`, `[OK] edited index.html — appearance unchanged`] }
          ],
          try: [
            { cmd: `claude "read @index.html and suggest three small tidy-ups that would not change how the page looks; do not change anything yet"`, desc: `suggestions first` },
            { cmd: `claude "in index.html, put the colours in named variables at the top of the style block, without changing how the page looks"`, desc: `a single tidy-up` },
            { cmd: `cat index.html`, desc: `read the result` },
            { cmd: `start index.html`, desc: `verify the appearance` }
          ]
        }
      },
      {
        id: `m3-d5`, title: `Module 3 summary`, minutes: 2, ready: true,
        intro: [
          `You set up the single-file editing loop: read the proposal, give the right response, ask for an explanation when needed and make small tidy-ups. These habits still apply as the project grows.`
        ],
        blocks: [
          { t: `h`, text: `Module 3 quick reference` },
          { t: `table`, head: [`Skill`, `Move`], rows: [
            [`Read a diff`, `<code>-</code> shows what's removed, <code>+</code> what's added; context lines show the location.`],
            [`Review order`, `Which file → how much change → what's being removed?`],
            [`Respond`, `Accept the pending proposal, adjust it with short feedback, or reject it.`],
            [`Understand first`, `Ask “Explain @index.html” and “Why is it written this way?”.`],
            [`Tidy up`, `Make a small refactor; check appearance and behaviour in the browser.`]
          ] },
          { t: `h`, text: `Mental model` },
          { t: `p`, html: `<strong>Ask → read the diff → accept or adjust → check the page.</strong> Keeping the scope of a change small makes both reviewing it and finding the source of a problem easier.` },
          { t: `callout`, kind: `warn`, title: `Know your permission mode`, html: `In modes that require approval, you assess pending changes. If automatic edit permissions are on, you may not be asked about every change; know the selected mode and review applied diffs too.` },
          { t: `practice` }
        ],
        trouble: [],
        have: [
          `Telling added and removed lines apart in a diff.`,
          `Deliberately accepting, adjusting or rejecting a proposal.`,
          `Asking for an explanation before changing anything.`,
          `Making a small refactor and checking that appearance and behaviour are preserved.`
        ],
        note: `Ask, read, decide, check: I aim to apply this loop, learned on a single file, to every change.`,
        next: `Next: planning changes that affect more than one file and reviewing them together.`,
        prompt: `In the third module of a Claude Code course I learned about reading diffs, accepting/adjusting/rejecting proposals, asking for explanations and small refactors. Could you prepare a short 5-question review quiz? Give the answers at the end.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>My name</h1>\n<p>I am learning to build websites.</p>` },
          claude: [
            { match: `in index.html, change my main heading to say hello and then my name`, write: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>\n<p>I am learning to build websites.</p>` },
              out: [`Proposed change — index.html:`, `- <h1>My name</h1>`, `+ <h1>Hello, I'm Ayşe</h1>`, `  <p>I am learning to build websites.</p>`, `(simulation: proposal accepted)`, `[OK] edited index.html`] }
          ],
          try: [
            { cmd: `claude "in index.html, change my main heading to say hello and then my name"`, desc: `ask and read the diff` },
            { cmd: `cat index.html`, desc: `check the result` }
          ]
        }
      }
    ] },
    { id: `m4`, no: 4, title: `Build a multi-page site`, sub: `Plan, spread across pages, review the whole`, lessons: [
      {
        id: `m4-d1`, title: `Why planning matters`, minutes: 4, ready: true,
        intro: [
          `Once your site grows to more than one page, a change affects other files too. Renaming a page affects links; changing a shared menu affects every page. So plan the approach before moving on to edits.`
        ],
        blocks: [
          { t: `h`, text: `Step 1 — Ask for the plan, not the edit` },
          { t: `code`, label: `To Claude`, code: `I want to add a second page called projects.html\nand link to it from my home page. Plan the change first:\nlist the files you would touch and in what order.\nDo not edit anything yet.` },
          { t: `p`, html: `This way you see in advance which files will change and in what order. It's much easier to notice a missing page or a wrong assumption before editing starts.` },
          { t: `practice` },
          { t: `h`, text: `Step 2 — Read the plan critically` },
          { t: `list`, items: [
            `<strong>Scope:</strong> Are all the affected files in the list?`,
            `<strong>Order:</strong> Have shared style and link dependencies been considered?`,
            `<strong>Boundaries:</strong> Is there a file you don't want touched?`
          ] },
          { t: `p`, html: `There's no single right order for every job. What matters is that the plan's reasoning is clear and it doesn't skip dependencies.` },
          { t: `h`, text: `Step 3 — Use plan mode` },
          { t: `p`, html: `You can switch to plan mode with <kbd>Shift</kbd> + <kbd>Tab</kbd>. Check the selected mode in the interface; it can vary with version and permission settings.` },
          { t: `callout`, kind: `warn`, title: `A plan doesn't replace a review`, html: `Reading the plan doesn't change the fact that you need to review the applied changes afterwards. The plan sets the direction; the diff and the browser result confirm it.` },
          { t: `h`, text: `Try it now` },
          { t: `code`, label: `To Claude`, code: `plan how to give my site a projects page and an about page,\nboth linked from the home page;\nlist the files and the order, no edits yet` },
          { t: `p`, html: `Only read the plan. If a file is missing or there's a step you don't want, explain it and have the plan revised. You don't have to move on to implementation in this exercise.` }
        ],
        trouble: [
          { q: `Claude started editing directly instead of planning`, a: `Stop it with <kbd>Esc</kbd>. Add “do not edit anything yet” to the request, or switch to plan mode and ask again.` },
          { q: `A file is missing from the plan`, a: `Name the missing file: “you also need to update about.html”. Have the plan rewritten and read it again.` }
        ],
        have: [
          `You learned to ask for a plan with a file list and an order before editing.`,
          `You can check a plan for scope, order and boundaries.`,
          `You know where plan mode is and its limits.`
        ],
        note: `Because I need to update this site's Turkish and English pages together, the question “which files will you touch first?” matters especially to me.`,
        next: `Next: spreading the planned change consistently across all the relevant pages.`,
        prompt: `When I add a new page to a simple multi-page website, what kind of plan should I ask for before making changes? Which questions should I look at to check a plan?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>\n<p>Welcome, thanks for stopping by!</p>` },
          claude: [
            { match: `I want to add a second page called projects.html and link to it from my home page. Plan the change first: list the files you would touch and in what order. Do not edit anything yet`,
              out: [`Plan (I haven't changed any files yet):`, `1. projects.html — a new page; same structure and style as index.html.`, `2. index.html — add a link to projects.html.`, `Files I won't touch: none.`, `If you approve, I'll start with step 1.`] },
            { match: `plan how to give my site a projects page and an about page, both linked from the home page; list the files and the order, no edits yet`,
              out: [`Plan (no edits):`, `1. Create projects.html.`, `2. Create about.html.`, `3. Add links to both pages in index.html.`, `4. Check that the shared style is the same on all three pages.`, `Suggested order: pages first, then links — so the links don't point nowhere.`] }
          ],
          try: [
            { cmd: `claude "I want to add a second page called projects.html and link to it from my home page. Plan the change first: list the files you would touch and in what order. Do not edit anything yet."`, desc: `ask for the plan first` },
            { cmd: `ls`, desc: `nothing changed?` },
            { cmd: `claude "plan how to give my site a projects page and an about page, both linked from the home page; list the files and the order, no edits yet"`, desc: `a two-page plan` }
          ]
        }
      },
      {
        id: `m4-d2`, title: `Edits across files`, minutes: 4, ready: true,
        intro: [
          `Once the plan is ready, spread the change consistently across all the relevant pages. For a shared menu, colour or footer, decide which pages need to change together.`
        ],
        blocks: [
          { t: `h`, text: `Step 1 — Add the shared menu to every page` },
          { t: `code`, label: `To Claude`, code: `add the same navigation menu - Home, Projects, About -\nto the top of every page,\nlinking each one to the right file` },
          { t: `p`, html: `Claude may propose edits in more than one file. Read each file not on its own but in terms of its role in the change as a whole.` },
          { t: `practice` },
          { t: `h`, text: `Step 2 — Review across the files` },
          { t: `list`, items: [
            `<strong>Complete?</strong> Did every relevant page get the change?`,
            `<strong>Consistent?</strong> Do the menu names, their order and the target links match?`,
            `<strong>Limited to the plan?</strong> Were only the intended files touched?`
          ] },
          { t: `h`, text: `Step 3 — Really verify in the browser` },
          { t: `cmd`, code: `start index.html` },
          { t: `p`, html: `Open the home page. Move to the other pages from the menu and try the links on each page. Check that the file names, folder paths and upper/lower case are right.` },
          { t: `h`, text: `Step 4 — Report the gap concretely` },
          { t: `p`, html: `If the menu is missing on a page, name the file and the symptom:` },
          { t: `code`, label: `To Claude`, code: `the menu is missing on about.html;\nadd the same menu as on the other pages` },
          { t: `p`, html: `After the fix, try the relevant links again.` }
        ],
        trouble: [
          { q: `A link gives a “file not found” error`, a: `Compare the file name in the link with the actual file name; upper/lower case and the folder path matter too. Check the file's name with <code>ls</code>.` },
          { q: `The menu looks different on one page`, a: `Ask whether that page uses the same style file or style block, and ask for a fix naming the page.` }
        ],
        have: [
          `You learned to have a shared item applied to all the relevant pages together.`,
          `You can review a multi-file diff for completeness, consistency and scope.`,
          `You learned to verify links by trying them in the browser and to report gaps concretely.`
        ],
        note: `This site's top menu and footer are shared across six pages; this lesson made it clear that when I change one, I need to check them all.`,
        next: `Next: breaking large changes into reviewable pieces.`,
        prompt: `I want to add a shared navigation menu to a simple three-page HTML site (index, projects, about). How do I ask for the change, and what should I look at to check the result?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: {
            "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>`,
            "~/my-first-project/projects.html": `<h1>Projects</h1>`,
            "~/my-first-project/about.html": `<h1>About me</h1>`
          },
          cmds: [
            { match: `start index.html`, out: [`(simulation) index.html would open in the browser. Try each link in the menu one by one.`] }
          ],
          claude: [
            { match: `add the same navigation menu - Home, Projects, About - to the top of every page, linking each one to the right file`,
              write: {
                "~/my-first-project/index.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="about.html">About</a></nav>\n<h1>Hello, I'm Ayşe</h1>`,
                "~/my-first-project/projects.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="about.html">About</a></nav>\n<h1>Projects</h1>`
              },
              out: [`[OK] edited index.html — menu added`, `[OK] edited projects.html — menu added`, `(simulation: about.html was skipped this round — try to spot it by checking)`] },
            { match: `the menu is missing on about.html; add the same menu as on the other pages`,
              write: { "~/my-first-project/about.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="about.html">About</a></nav>\n<h1>About me</h1>` },
              out: [`[OK] edited about.html — added the same menu as on the other pages`] }
          ],
          try: [
            { cmd: `claude "add the same navigation menu - Home, Projects, About - to the top of every page, linking each one to the right file"`, desc: `shared menu` },
            { cmd: `cat about.html`, desc: `is it on every page?` },
            { cmd: `claude "the menu is missing on about.html; add the same menu as on the other pages"`, desc: `report the gap` },
            { cmd: `cat about.html`, desc: `fixed?` }
          ]
        }
      },
      {
        id: `m4-d3`, title: `Breaking tasks into pieces`, minutes: 2, ready: true,
        intro: [
          `Jobs like “build my whole site” or “redesign everything” can produce changes too large to review in one go. The solution is to break the job into pieces you can check one at a time.`
        ],
        blocks: [
          { t: `h`, text: `Step 1 — Find the natural steps` },
          { t: `steps`, items: [
            `Create the projects page with its content.`,
            `Create the about page with its content.`,
            `Add the shared navigation menu to all pages.`,
            `Make the colours and fonts consistent.`
          ] },
          { t: `p`, html: `The order of the steps can vary by project. At the end of each piece, aim for a working state where you can open and review the site.` },
          { t: `h`, text: `Step 2 — Do one piece, then stop` },
          { t: `code`, label: `To Claude`, code: `do step 1 only: create the projects page with a heading\nand a short list of things I have made.\nStop and let me review before the next step.` },
          { t: `p`, html: `Read the diff at each step and check the result in the browser.` },
          { t: `callout`, kind: `warn`, title: `Accepting isn't backing up`, html: `An accepted step is not, on its own, a permanent backup. For a reliable return point, use a suitable checkpoint or a Git commit; you'll see Git in Module 5.` },
          { t: `practice` },
          { t: `h`, text: `Manage the context as needed` },
          { t: `p`, html: `If the next piece is independent, you can start clean with <code>/clear</code>. If important decisions from the same job are still needed, keep the context or summarise it with <code>/compact</code>. When you start clean, restate the remaining plan and the files needed.` },
          { t: `h`, text: `Try it now` },
          { t: `code`, label: `To Claude`, code: `let us build my about page in steps. Step one:\njust the page with my name and a short bio.\nWe will add the rest after I look at it.` },
          { t: `p`, html: `After opening and reviewing the page, move on to the next step.` }
        ],
        trouble: [
          { q: `Claude went on to the next step without stopping`, a: `Stop it with <kbd>Esc</kbd> and write clearly in the request “stop after this step” or “do step 1 only”.` },
          { q: `The site broke after a step`, a: `Look only at that step's diff; because the pieces are small, finding the source of the problem is easy. If needed, go back to before that step with <code>/rewind</code>.` }
        ],
        have: [
          `You learned to break a big job into natural, checkable steps.`,
          `You can ask Claude to do a single step and stop.`,
          `You learned to manage context and return points deliberately between steps.`
        ],
        note: `This site was built piece by piece too, not in one go; stopping after each piece to open the page let me see problems early.`,
        next: `Next: reviewing the site as a whole once the pieces are done.`,
        prompt: `How do I break a big job like “build my personal website” into small steps that can each be checked separately? Could you prepare an example list of steps?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>` },
          claude: [
            { match: `do step 1 only: create the projects page with a heading and a short list of things I have made. Stop and let me review before the next step`,
              write: { "~/my-first-project/projects.html": `<h1>Projects</h1>\n<ul>\n  <li>My first web page</li>\n  <li>A shopping list in Markdown</li>\n</ul>` },
              out: [`[OK] wrote projects.html`, `Step 1 done. I'm stopping here so you can review.`] },
            { match: `let us build my about page in steps. Step one: just the page with my name and a short bio. We will add the rest after I look at it`,
              write: { "~/my-first-project/about.html": `<h1>Ayşe</h1>\n<p>I am learning to build and publish websites with Claude Code.</p>` },
              out: [`[OK] wrote about.html — only the name and a short bio`, `We'll continue after you've looked at it.`] }
          ],
          try: [
            { cmd: `claude "do step 1 only: create the projects page with a heading and a short list of things I have made. Stop and let me review before the next step."`, desc: `a single step` },
            { cmd: `cat projects.html`, desc: `review the step` },
            { cmd: `claude "let us build my about page in steps. Step one: just the page with my name and a short bio. We will add the rest after I look at it."`, desc: `step by step` },
            { cmd: `ls`, desc: `what was created?` }
          ]
        }
      },
      {
        id: `m4-d4`, title: `Reviewing your own diff`, minutes: 2, ready: true,
        intro: [
          `Reviewing each piece matters; but in the end you should also look at the site as a whole. The site opening doesn't mean all the pages and links are right.`
        ],
        blocks: [
          { t: `h`, text: `Step 1 — Go through it from start to finish` },
          { t: `p`, html: `On each page, check its purpose, the finished content and how it fits with the other pages. Make a habit of looking for placeholder text, half-finished sections and forgotten links.` },
          { t: `h`, text: `Quick self-review` },
          { t: `table`, head: [`Check`, `What you're looking for`], rows: [
            [`Complete`, `Every page is finished; no half-done sections or placeholders.`],
            [`Consistent`, `The shared menu, colours and footer match.`],
            [`Links`, `Every link goes to its real intended target.`],
            [`Real content`, `Correct content that's yours instead of example text.`]
          ] },
          { t: `h`, text: `Step 2 — Ask Claude for a second review` },
          { t: `code`, label: `To Claude`, code: `look over all my pages as if you are a first-time visitor.\nWhat is inconsistent, unfinished, or confusing?\nDo not change anything yet.` },
          { t: `p`, html: `Verify the findings against the files and pages. You decide which fixes to make; you don't have to apply every suggested change.` },
          { t: `practice` },
          { t: `callout`, kind: `warn`, title: `A file review doesn't replace the browser`, html: `Claude reviewing the files doesn't replace going through the pages in the browser. Check for yourself whether a link goes to the right file, and how things look. Really look at the result before you say “done”.` }
        ],
        trouble: [
          { q: `The problem Claude found isn't real`, a: `Check the finding in the file and in the browser. If it's wrong, say so and move on; you don't have to apply every suggestion.` },
          { q: `I can't find the placeholder text`, a: `Ask Claude to list it: “list any placeholder or example text on my pages; do not change anything”.` }
        ],
        have: [
          `You learned to review the site as a whole once the pieces are done.`,
          `You have a four-item checklist for completeness, consistency, links and real content.`,
          `You can ask Claude for a review through a first-time visitor's eyes and verify the findings.`
        ],
        note: `Before publishing this site I had the links checked one by one with a script; but going through the pages in the browser still remained a separate step.`,
        next: `Next: the Module 4 summary.`,
        prompt: `Could you prepare a checklist for reviewing my personal website before publishing it? Use the headings completeness, consistency, links and content.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: {
            "~/my-first-project/index.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="about.html">About</a></nav>\n<h1>Hello, I'm Ayşe</h1>`,
            "~/my-first-project/projects.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="About.html">About</a></nav>\n<h1>Projects</h1>\n<p>Lorem ipsum dolor sit amet.</p>`,
            "~/my-first-project/about.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="about.html">About</a></nav>\n<h1>About me</h1>\n<p>I am learning to build and publish websites.</p>`
          },
          claude: [
            { match: `look over all my pages as if you are a first-time visitor. What is inconsistent, unfinished, or confusing? Do not change anything yet`,
              out: [`I haven't changed anything. Findings:`, `1. projects.html — the About link in the menu goes to "About.html"; the file is called "about.html".`, `2. projects.html — "Lorem ipsum" placeholder text is still there.`, `3. index.html — there's no sentence telling visitors what the site is.`, `Which ones would you like me to fix?`] }
          ],
          try: [
            { cmd: `cat projects.html`, desc: `look yourself` },
            { cmd: `claude "look over all my pages as if you are a first-time visitor. What is inconsistent, unfinished, or confusing? Do not change anything yet."`, desc: `a second pair of eyes` },
            { cmd: `ls`, desc: `compare the file names` }
          ]
        }
      },
      {
        id: `m4-d5`, title: `Module 4 summary`, minutes: 2, ready: true,
        intro: [
          `You can now plan a change that affects more than one page, apply it consistently and check it in small steps. At the final stage you review the site as a whole.`
        ],
        blocks: [
          { t: `h`, text: `Module 4 quick reference` },
          { t: `table`, head: [`Skill`, `Move`], rows: [
            [`Plan first`, `Before editing, ask for a plan, a file list and an order; use plan mode when appropriate.`],
            [`Think about every page`, `Have a shared change applied to all the relevant pages; verify by trying the links.`],
            [`Break up big jobs`, `Split them into natural steps; review the diff and the page after each piece.`],
            [`Final review`, `Check completeness, consistency, links and real content; ask Claude for a review too.`]
          ] },
          { t: `h`, text: `Mental model` },
          { t: `p`, html: `<strong>Plan → change → review the diff → check the pages.</strong> The single-file loop carries on exactly as before; the added habit is thinking about consistency across pages together.` },
          { t: `p`, html: `If a menu or style is shared, consider all the relevant pages. Instead of reviewing a big job in one go, split it into small steps, and go through the whole site before publishing.` },
          { t: `practice` }
        ],
        trouble: [],
        have: [
          `Planning and reviewing a multi-file change.`,
          `Keeping shared items consistent across all pages.`,
          `Carrying out a big job in small, checked steps.`,
          `Assessing the finished site as a whole.`
        ],
        note: `Plan, change, review, check: for a multi-page site I added a “think about all the pages together” step to this loop.`,
        next: `Next: moving your site from your computer to the internet and publishing it at a shareable address.`,
        prompt: `In the fourth module of a Claude Code course I learned about planning a multi-page site, edits across files, breaking work into pieces and the final review. Could you prepare a short 5-question review quiz? Give the answers at the end.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: {
            "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>`,
            "~/my-first-project/projects.html": `<h1>Projects</h1>`,
            "~/my-first-project/about.html": `<h1>About me</h1>`
          },
          try: [
            { cmd: `ls`, desc: `the site's files` },
            { cmd: `cat about.html`, desc: `read a page` }
          ]
        }
      }
    ] },
    { id: `m5`, no: 5, title: `Ship your first project`, lessons: [
      { id: `m5-d1`, title: `Localhost vs. the live web`, minutes: 2 },
      { id: `m5-d2`, title: `Git: the five commands you need`, minutes: 2 },
      { id: `m5-d3`, title: `Deploying to Vercel`, minutes: 2 },
      { id: `m5-d4`, title: `Environment variables and secrets`, minutes: 2 },
      { id: `m5-d5`, title: `Domains, HTTPS and really going live`, minutes: 2 },
      { id: `m5-d6`, title: `Module 5 summary`, minutes: 1 }
    ] },
    { id: `m6`, no: 6, title: `Hooks, MCP and workflow`, lessons: [
      { id: `m6-d1`, title: `CLAUDE.md: teach Claude your project`, minutes: 2 },
      { id: `m6-d2`, title: `Slash commands and subagents`, minutes: 2 },
      { id: `m6-d3`, title: `Hooks: automate the boring parts`, minutes: 2 },
      { id: `m6-d4`, title: `MCP: give Claude new tools`, minutes: 2 },
      { id: `m6-d5`, title: `Beyond the terminal: Agent SDK`, minutes: 2 },
      { id: `m6-d6`, title: `Module 6 summary`, minutes: 1 }
    ] },
    { id: `m7`, no: 7, title: `Capstone: publish your own site`, lessons: [
      { id: `m7-d1`, title: `The capstone brief`, minutes: 2 },
      { id: `m7-d2`, title: `Build the pages, deploy on day one`, minutes: 2 },
      { id: `m7-d3`, title: `Fill it with real content`, minutes: 3 },
      { id: `m7-d4`, title: `Add a way to reach you`, minutes: 4 },
      { id: `m7-d5`, title: `Polish, review and publish`, minutes: 2 },
      { id: `m7-d6`, title: `Module 7 summary: you shipped`, minutes: 2 }
    ] }
  ]
};
