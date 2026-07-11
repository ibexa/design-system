#!/usr/bin/env node
// Converts a Claude Code session transcript (JSONL) into readable markdown:
// user prompts, assistant text, and every tool call (Bash commands, edited files).
//
// Usage:
//   node .claude/scripts/transcript-to-md.mjs --latest            # newest session of THIS repo
//   node .claude/scripts/transcript-to-md.mjs <path-to.jsonl>     # a specific transcript
//   node .claude/scripts/transcript-to-md.mjs --list              # list this repo's sessions
//
// Transcripts live in ~/.claude/projects/<sanitized-cwd>/*.jsonl — one file per session.

import fs from 'fs';
import os from 'os';
import path from 'path';

const RESULT_PREVIEW_CHARS = 400;

const projectDir = () => {
    const sanitized = process.cwd().replace(/[^a-zA-Z0-9]/g, '-');

    return path.join(os.homedir(), '.claude', 'projects', sanitized);
};

const listSessions = () =>
    fs
        .readdirSync(projectDir())
        .filter((file) => file.endsWith('.jsonl'))
        .map((file) => path.join(projectDir(), file))
        .sort((fileA, fileB) => fs.statSync(fileA).mtimeMs - fs.statSync(fileB).mtimeMs);

const describeToolUse = (toolUse) => {
    const { name, input = {} } = toolUse;

    if (name === 'Bash') {
        return `\`\`\`bash\n$ ${input.command ?? ''}\n\`\`\``;
    }

    if (['Edit', 'Write', 'Read', 'NotebookEdit'].includes(name)) {
        return `**${name}** \`${input.file_path ?? ''}\``;
    }

    const inputPreview = JSON.stringify(input);
    const shortInput = inputPreview.length > RESULT_PREVIEW_CHARS ? `${inputPreview.slice(0, RESULT_PREVIEW_CHARS)}…` : inputPreview;

    return `**${name}** \`${shortInput}\``;
};

const contentToText = (content) => {
    if (typeof content === 'string') {
        return content;
    }

    if (!Array.isArray(content)) {
        return '';
    }

    return content
        .filter((part) => part.type === 'text')
        .map((part) => part.text)
        .join('\n');
};

const main = () => {
    const arg = process.argv[2];

    if (arg === '--list') {
        for (const file of listSessions()) {
            const { mtime } = fs.statSync(file);

            console.log(`${mtime.toISOString()}  ${file}`);
        }

        return;
    }

    let file = arg;

    if (!file || file === '--latest') {
        const sessions = listSessions();

        file = sessions[sessions.length - 1];

        if (!file) {
            console.error(`No transcripts found in ${projectDir()}`);
            process.exit(1);
        }
    }

    console.log(`# Session transcript — ${path.basename(file, '.jsonl')}\n`);

    for (const line of fs.readFileSync(file, 'utf-8').split('\n')) {
        if (!line.trim()) {
            continue;
        }

        let entry;

        try {
            entry = JSON.parse(line);
        } catch {
            continue;
        }

        const { type, message } = entry;

        if (type === 'user' && message?.content) {
            const text = contentToText(message.content);
            // Skip tool results routed back as user messages; keep real prompts.
            const isToolResult = Array.isArray(message.content) && message.content.some((part) => part.type === 'tool_result');

            if (text.trim() && !isToolResult) {
                console.log(`## ▶ USER\n\n${text.trim()}\n`);
            }
        }

        if (type === 'assistant' && message?.content) {
            const text = contentToText(message.content);

            if (text.trim()) {
                console.log(`### ◆ ASSISTANT\n\n${text.trim()}\n`);
            }

            for (const part of message.content) {
                if (part.type === 'tool_use') {
                    console.log(`${describeToolUse(part)}\n`);
                }
            }
        }
    }
};

main();
