//Imports
import {it} from "@core/setup"
import {deepmerge, deferred} from "@tools/std"
import {template} from "@tools/template"
import type {loose, uninitialized} from "@types"

/** Scope */
export class Scope {
  /** Constructor */
  constructor({meta = {}, context = {}}: {meta?: Partial<meta>, context?: loose} = {}) {
    this.async({meta, context})
  }

  /** Async constructor */
  protected async async({meta, context}: {meta: Partial<meta>, context: loose}) {
    this.#meta = deepmerge<meta>(Scope.default, meta)
    this.#context = context
    this.name = this.#meta._ ? await template(this.#meta._, context, {safe: true}) : ""
    this.ready.resolve(this)
    return await this.ready as this
  }

  /** Ready state */
  readonly ready = deferred<this>()

  /** Scope name */
  name = ""

  /** Meta */
  #meta = {} as uninitialized as meta

  /** Context */
  #context = {} as loose

  /** Context */
  get context() {
    return this.#context as Readonly<loose>
  }

  /** Executor */
  get executor() {
    return {instance: it.executors[this.#meta.using], name: this.#meta.using}
  }

  /** Reporter */
  get reporter() {
    return it.reporters[this.#meta.report]
  }

  /** Vault */
  get vault() {
    return it.vaults[this.#meta.vault]
  }

  /** Inventory */
  get inventory() {
    return it.inventories[this.#meta.inventory]
  }

  /** Targets hosts */
  get targets() {
    return (async () => Promise.all([...await this.inventory.query(this.#meta.targets)].map(host => this.inventory.get(host))))()
  }

  /** Create new scope from current scope */
  async from({meta, context}: {meta: meta, context: loose}) {
    return await new Scope({meta: deepmerge(this.#meta, meta), context: deepmerge(this.#context, context)}).ready
  }

  /** Keywords list and patterns */
  static readonly keywords = {
    list: [
      "_",
      "using", //
      "as",
      "inventory", //
      "targets", //
      "report", //
      "changed",
      "failed",
      "skipped",
      "mode",
    ],
    patterns: /^(loop:.+)$/,
    loop: /^loop:/,
  }

  /** Default scope content */
  private static readonly default = {
    targets: "(all)",
    report: "default",
    vault: "default",
    inventory: "default",
    using: "default",
  } as meta
}

/** Meta */
export type meta = {
  _?: string,
  targets: string | string[],
  report: keyof typeof it.reporters,
  vault: keyof typeof it.vaults,
  inventory: keyof typeof it.inventories,
  using: keyof typeof it.executors,
}