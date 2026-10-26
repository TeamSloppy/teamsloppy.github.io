import { useState } from 'react'

const platforms = {
  macos: {
    label: 'macOS',
    shell: 'Terminal',
    command: 'curl -fsSL https://sloppy.team/install.sh | bash',
    detail: 'Apple silicon · CLI + web dashboard · No build tools needed.',
  },
  windows: {
    label: 'Windows',
    shell: 'PowerShell',
    command: 'irm https://sloppy.team/install.ps1 | iex',
    detail: 'Windows x64 · CLI + web dashboard · No build tools needed.',
  },
  linux: {
    label: 'Linux',
    shell: 'Terminal',
    command: 'curl -fsSL https://sloppy.team/install.sh | bash',
    detail: 'x86_64 · CLI + web dashboard · No build tools needed.',
  },
}

type Platform = keyof typeof platforms

function currentPlatform(): Platform {
  if (/Windows/i.test(navigator.userAgent)) return 'windows'
  if (/Linux/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent)) return 'linux'
  return 'macos'
}

export function InstallCommand() {
  const [platform, setPlatform] = useState<Platform>(currentPlatform)
  const [copyStatus, setCopyStatus] = useState('Copy command')
  const [copying, setCopying] = useState(false)
  const selected = platforms[platform]

  async function copyCommand() {
    setCopying(true)
    try {
      await navigator.clipboard.writeText(selected.command)
      setCopyStatus('Copied')
    } catch {
      setCopyStatus('Select the command to copy')
    } finally {
      setCopying(false)
    }
  }

  return (
    <div className="quick-install" id="install" aria-label="Install Sloppy CLI">
      <div className="quick-install__header">
        <strong>One command. Then you’re in.</strong>
        <div className="quick-install__platforms" role="group" aria-label="Operating system">
          {(Object.keys(platforms) as Platform[]).map((key) => (
            <button
              type="button"
              key={key}
              aria-pressed={platform === key}
              disabled={copying}
              onClick={() => {
                setPlatform(key)
                setCopyStatus('Copy command')
              }}
            >
              {platforms[key].label}
            </button>
          ))}
        </div>
      </div>
      <div className="quick-install__command">
        <code aria-label={`${selected.shell} install command`}>{selected.command}</code>
        <button type="button" onClick={copyCommand} disabled={copying} aria-label="Copy install command">
          {copyStatus}
        </button>
      </div>
      <p>{selected.detail}</p>
      <div className="quick-install__next">
        <span>Open a new terminal, then run <code>sloppy</code></span>
        <a href="https://docs.sloppy.team/install">Installation guide ↗</a>
      </div>
      <span role="status" className="sr-only">
        {copyStatus === 'Copied' ? `${selected.label} install command copied to clipboard` : copyStatus === 'Select the command to copy' ? copyStatus : ''}
      </span>
    </div>
  )
}
