import { Card } from "../../../atoms/card/card";
import { TwoColumnCursor } from "../../../templates/two-column-cursor/two-column-cursor";

export const Desktop = (): JSX.Element => {
    return (
        <TwoColumnCursor>
            <Card>Notification</Card>
            <Card>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet possimus magnam libero porro, aliquid doloremque velit sapiente aperiam maiores autem maxime. Rem, corporis veritatis. Id nobis at qui provident veniam.
            </Card>
        </TwoColumnCursor>
    );
};
