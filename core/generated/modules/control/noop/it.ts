//deno-lint-ignore-file ban-unused-ignore no-empty-interface
/*
 * THIS FILE IS AUTO-GENERATED, PLEASE DO NOT EDIT
 */

//Imports
import {Module} from "@core/modules"
import type {before as _before, initialized as _initialized, mcall, outcome as _outcome} from "@core/modules"
import type {loose} from "@types"

/** No operation */
export class ControlNoopModule extends Module<raw, args, past, result> {
  /** Constructor */
  constructor() {
    super(ControlNoopModule)
  }

  /** Execute module */
  static async call(args: raw & mcall<raw, args, past, result>, context = {} as loose) {
    const instance = await new this().ready
    return instance.call(args ?? {}, context)
  }

  /** Arguments validator */
  static async prevalidate(args: raw & mcall<raw, args, past, result>, context = {} as loose) {
    const instance = await new this().ready
    return instance.prevalidate(args, {context})
  }

  /** Url */
  static readonly url = import.meta.url

  /** Definition */
  static readonly definition = {"description": "No operation\n", "controller": true, "args": null, "past": null, "result": null, "maintainers": ["lowlighter"]}
}
export {ControlNoopModule as Module}

/** Input arguments */
export interface raw {
}

/** Validated and transformed arguments */
export interface args {
}

/** Module target initializated (before execution) */
export type initialized = _initialized<raw, args>

/** Past state */
export interface past extends result {
}

/** Module target status (after probing) */
export type before = _before<raw, args, past>

/** Resulting state */
export interface result {
}

/** Module outcome */
export type outcome = _outcome<raw, args, past, result>