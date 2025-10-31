# grepjs

A simple grep-like CLI written in TypeScript.

<img width="533" height="179" alt="image" src="https://github.com/user-attachments/assets/dd17d91e-0c34-4e7a-bef3-02fb56255d45" />

## Installation

```bash
npm install -g @lsmacedo/grepjs
```

## Usage

```bash
# Search for "hello" in files
grepjs hello file1.txt file2.txt

# Search from stdin
echo "hello world" | grepjs "hello"
```

## Local Development

Install dependencies:

```bash
npm install
```

Run in development mode:

```bash
npm run dev -- <pattern> [files...]
```
