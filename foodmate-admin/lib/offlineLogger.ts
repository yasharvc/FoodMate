import pino from "pino";
import path from "path";
import fs from "fs";
import { formatDate } from "./dateUtils";

const logPath = path.join(process.cwd(), `${process.env.OFFLINE_LOG_PATH}/app${formatDate()}.log`);
fs.mkdirSync(path.dirname(logPath), { recursive: true });

const logger = pino(
	{
		level: "info",
	},
	fs.createWriteStream(logPath, { flags: "a" })
);

export function info (msg: string, ...args: unknown[]) {
	logger.info(msg, ...args);
}
export function error (msg: string, ...args: unknown[]) {
	logger.error(msg, ...args);
}
export function warn (msg: string, ...args: unknown[]) {
	logger.warn(msg, ...args);
}
export function debug (msg: string, ...args: unknown[]) {
	logger.debug(msg, ...args);
}
export function trace (msg: string, ...args: unknown[]) {
	logger.trace(msg, ...args);
}
export function fatal (msg: string, ...args: unknown[]) {
	logger.fatal(msg, ...args);
}
export function child (bindings: Record<string, unknown>) {
	return logger.child(bindings);
}
export function flush () {
	logger.flush();
}

export { logger as offlineLoger };