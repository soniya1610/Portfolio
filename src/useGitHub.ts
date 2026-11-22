import { useCallback, useEffect, useState } from 'react'

export interface GitHubProfile {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
}

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  fork: boolean
}

const API = 'https://api.github.com'
const headers = { Accept: 'application/vnd.github+json' }

async function fetchJSON<T>(url: string, signal?: AbortSignal): Promise<{ data: T; next: string | null }> {
  const response = await fetch(url, { headers, signal })
  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error('GitHub API rate limit reached. Please try again in a little while.')
    }
    throw new Error(`GitHub request failed (${response.status}). Please try again.`)
  }
  const link = response.headers.get('Link')
  const next = link?.match(/<([^>]+)>;\s*rel="next"/)?.[1] ?? null
  return { data: (await response.json()) as T, next }
}

export function useGitHub() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [repositories, setRepositories] = useState<GitHubRepository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async (signal?: AbortSignal) => {
    try {
      const [profileResult, firstPage] = await Promise.all([
        fetchJSON<GitHubProfile>(`${API}/users/soniya1610`, signal),
        fetchJSON<GitHubRepository[]>(`${API}/users/soniya1610/repos?per_page=100&sort=updated`, signal),
      ])
      const allRepos = [...firstPage.data]
      let next = firstPage.next
      while (next && !signal?.aborted) {
        const page = await fetchJSON<GitHubRepository[]>(next, signal)
        allRepos.push(...page.data)
        next = page.next
      }
      if (!signal?.aborted) {
        setProfile(profileResult.data)
        setRepositories(allRepos)
      }
    } catch (reason) {
      if (!signal?.aborted) {
        setError(reason instanceof Error ? reason.message : 'Unable to load GitHub activity.')
      }
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void load(controller.signal)
    return () => controller.abort()
  }, [load])

  const reload = useCallback(() => {
    setLoading(true)
    setError(null)
    void load()
  }, [load])

  return { profile, repositories, loading, error, reload }
}
