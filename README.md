# grepjs

A simple grep-like CLI written in TypeScript.

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
