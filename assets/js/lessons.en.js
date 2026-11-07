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
    { id: `m2`, no: 2, title: `Your first prompt`, lessons: [
      { id: `m2-d1`, title: `Anatomy of a prompt`, minutes: 7 },
      { id: `m2-d2`, title: `The clarity lever`, minutes: 6 },
      { id: `m2-d3`, title: `Context windows and /clear`, minutes: 5 },
      { id: `m2-d4`, title: `Slash commands`, minutes: 5 },
      { id: `m2-d5`, title: `@file and @directory`, minutes: 5 },
      { id: `m2-d6`, title: `Module 2 summary`, minutes: 3 }
    ] },
    { id: `m3`, no: 3, title: `Single-file edits`, lessons: [
      { id: `m3-d1`, title: `Reading a diff`, minutes: 5 },
      { id: `m3-d2`, title: `Accepting and adjusting edits`, minutes: 3 },
      { id: `m3-d3`, title: `Asking for explanations`, minutes: 2 },
      { id: `m3-d4`, title: `Small refactors`, minutes: 5 },
      { id: `m3-d5`, title: `Module 3 summary`, minutes: 2 }
    ] },
    { id: `m4`, no: 4, title: `Build a multi-page site`, lessons: [
      { id: `m4-d1`, title: `Why planning matters`, minutes: 4 },
      { id: `m4-d2`, title: `Edits across files`, minutes: 4 },
      { id: `m4-d3`, title: `Breaking tasks into pieces`, minutes: 2 },
      { id: `m4-d4`, title: `Reviewing your own diff`, minutes: 2 },
      { id: `m4-d5`, title: `Module 4 summary`, minutes: 2 }
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
