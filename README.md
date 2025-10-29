# grepjs

A simple grep-like CLI written in TypeScript.

<img width="623" height="143" alt="image" src="https://github.com/user-attachments/assets/ac23f3d0-c1d9-41ba-8d6e-7c16760e8f8d" />

## Running locally

Install dependencies:

```bash
npm install
```

Run in development mode:

```bash
npm run dev -- <pattern> [files...]
```

Or build and run the compiled version:

```bash
npm run build
npm install -g .
grepjs <pattern> [files...]
```

Examples:

```bash
# Search for "hello" in files
grepjs hello file1.txt file2.txt

# Search from stdin
echo "hello world" | grepjs "hello"
```
