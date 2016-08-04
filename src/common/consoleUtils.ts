/**
 * Console Utility class that provides extension methods on the console
 */
export class ConsoleUtils {
    /**
     * Logs a message in a specified color on the standard output.
     */
    public static log(color?: TerminalColors, message?: any,  ...optionalParams: any[]): void {
        if( color == null) {
            console.log(message, optionalParams);
        }
        else {
            let colordMessage = `${color}${message}${TerminalColors.Normal}`;
            if(optionalParams.length > 0){
                console.log(colordMessage, optionalParams);
            }
            else {
                console.log(colordMessage);
            }
        }
    }
}


/** 
 * Provides the Ansicolor library provides color console in Windows as ANSICON for Golang
 * https://github.com/shiena/ansicolor/blob/master/README.md
*/
export class TerminalColors{
   
    public static get Normal(): string { return "\x1b[0m"; }

    public static get Red(): string  { return "\x1b[31m"; }
    public static get Green(): string  { return "\x1b[32m"; }
    public static get Yellow(): string  { return "\x1b[33m"; }
    public static get Blue(): string  { return "\x1b[34m"; }
    public static get Magenta(): string  { return "\x1b[35m"; }
    public static get Cyan(): string  { return "\x1b[36m"; }
    public static get White(): string  { return "\x1b[37m"; }
     
    public static get Default(): string  { return "\x1b[39m"; }
    
    public static get LightGray(): string  { return "\x1b[90m"; }
    public static get LightRed(): string  { return "\x1b[91m"; }
    public static get LightGreenRed(): string  { return "\x1b[92m"; }
    public static get LightYellow(): string  { return "\x1b[93m"; }
    public static get LightBlue(): string  { return "\x1b[94m"; }
    public static get LightMagenta(): string  { return "\x1b[95m"; }
    public static get LightCyan(): string  { return "\x1b[96m"; }
    public static get LightWhite(): string  { return "\x1b[97m"; }
}
