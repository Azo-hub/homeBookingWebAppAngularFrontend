import { Property } from "./property";

export class Amenities {
    public id!: number;
    public amenitiesContent: string;
    public property!: Property;

    constructor() {

        this.amenitiesContent = "";
    }
}
