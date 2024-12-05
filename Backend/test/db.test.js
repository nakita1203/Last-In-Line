import mongoose from "mongoose";
import { connectDB } from "../config/db.js";

describe("Database Connection", () => {
    let originalExit;

    // Setup before running all tests
    before(() => {
        console.log("Setup before running tests");
        // Save the original process.exit
        originalExit = process.exit;
        // Mock process.exit to prevent exiting during tests
        process.exit = () => { };
    });

    // Setup before each test
    beforeEach(() => {
        console.log("Setup before each test");
    });

    // Cleanup after each test
    afterEach(() => {
        console.log("Cleanup after each test");
    });

    // Cleanup after running all tests
    after(() => {
        console.log("Cleanup after running all tests");
        // Restore the original process.exit
        process.exit = originalExit;
    });

    describe("Successful connection", () => {
        it("should connect to the database successfully", async () => {
            await connectDB();

            // Check if the connection state is 'connected'
            if (mongoose.connection.readyState != 1) {
                throw new Error("Failed to connect to the database");
            }
        });
    });

    describe("Error handling", () => {
        it("should handle ETIMEDOUT error", async () => {
            // Mock mongoose.connect to throw ETIMEDOUT error
            mongoose.connect = async () => {
                throw { message: { code: "ETIMEDOUT" } };
            };

            let exited = false;
            // Mock process.exit to check if it gets called with code 1
            process.exit = (code) => {
                if (code === 1) exited = true;
            };

            await connectDB();

            // Verify if process.exit was called
            if (!exited) {
                throw new Error("Process did not exit on ETIMEDOUT error");
            }
        });

        it("should handle ECONNREFUSED error", async () => {
            // Mock mongoose.connect to throw ECONNREFUSED error
            mongoose.connect = async () => {
                throw { message: { code: "ECONNREFUSED" } };
            };

            let exited = false;
            // Mock process.exit to check if it gets called with code 1
            process.exit = (code) => {
                if (code === 1) exited = true;
            };

            await connectDB();

            // Verify if process.exit was called
            if (!exited) {
                throw new Error("Process did not exit on ECONNREFUSED error");
            }
        });

        it("should handle EADDRINUSE error", async () => {
            // Mock mongoose.connect to throw EADDRINUSE error
            mongoose.connect = async () => {
                throw new Error("EADDRINUSE");
            };

            let exited = false;
            // Mock process.exit to check if it gets called with code 1
            process.exit = (code) => {
                if (code === 1) exited = true;
            };

            await connectDB();

            // Verify if process.exit was called
            if (!exited) {
                throw new Error("Process did not exit on EADDRINUSE error");
            }
        });

        it("should handle generic connection error", async () => {
            // Mock mongoose.connect to throw a generic error
            mongoose.connect = async () => {
                throw new Error("Generic Error");
            };

            let exited = false;
            // Mock process.exit to check if it gets called with code 1
            process.exit = (code) => {
                if (code === 1) exited = true;
            };

            await connectDB();

            // Verify if process.exit was called
            if (!exited) {
                throw new Error("Process did not exit on generic connection error");
            }
        });
    });
});