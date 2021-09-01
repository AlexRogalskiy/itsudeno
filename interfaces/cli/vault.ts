//Imports
import {Host} from "@core/inventories"
import {it} from "@core/setup"
import {is} from "@tools/is"
import {Logger} from "@tools/log"
import {access} from "@tools/objects"
import {stringify} from "std/encoding/yaml.ts"
import {gray, italic} from "std/fmt/colors.ts"
import {Confirm, Input} from "x/cliffy@v0.19.5/mod.ts"
import {ItsudenoError} from "@errors"
import type {infered} from "@types"
const log = new Logger(import.meta.url)

/** Cli bindings */
export const cli = {
  /** Get secrets */
  async get({vault = "default"}, secret = "") {
    //Check if secret exists
    if (!await it.vaults[vault].has(secret)) {
      console.log(italic(gray("(no secrets matched)")))
      return
    }

    //Print secret
    console.log(await it.vaults[vault].get(secret))
  },
  /** Set secrets */
  async set({vault = "default", value = null, yes = false}, secret = "") {
    //Retrieve value
    if (is.null(value)) {
      if (yes)
        throw new ItsudenoError.Aborted("no value")
      value = await Input.prompt(`New value?`)
    }

    //User confirmation
    if ((!yes) && (!await Confirm.prompt(`The following secret will be updated, confirm changes?\n  - ${secret}\n`)))
      throw new ItsudenoError.Aborted("operation aborted by user")

    //Update secret
    await it.vaults[vault].set(secret, value)
  },
  /** Delete secrets */
  async delete({vault = "default", yes = false}, secret = "") {
    //Check if secret exists
    if (!await it.vaults[vault].has(secret)) {
      console.log(italic(gray("(no secrets matched)")))
      return
    }

    //User confirmation
    if ((!yes) && (!await Confirm.prompt(`The following secret will be deleted, confirm changes?\n  - ${secret}\n`)))
      throw new ItsudenoError.Aborted("operation aborted by user")

    //Delete secret
    await it.vaults[vault].delete(secret)
  },
}
