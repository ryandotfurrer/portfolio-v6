import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '~/components/react/Tabs';

interface Props {
  tabsData: {
    defaultValue: string;
    className?: string;
    tabsListData: {
      tabsTriggerData: {
        value: string;
        label: string;
      }[];
    };
    tabsContentData: {
      value: string;
      paragraphs: string[];
    }[];
  };
}

interface HeadingProps {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
}

const Heading = ({ level, children }: HeadingProps) => {
  const Tag = level;
  return <Tag>{children}</Tag>;
};

export function TabsCustom({ tabsData }: Props) {
  return (
    <Tabs
      defaultValue={tabsData.defaultValue}
      className={`${tabsData.className}`}
    >
      <TabsList>
        {tabsData.tabsListData.tabsTriggerData.map((tab) => (
          <TabsTrigger
            className="cursor-pointer"
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsData.tabsContentData.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <Heading level="h2">
            {
              tabsData.tabsListData.tabsTriggerData.find(
                (trigger) => trigger.value === tab.value,
              )?.label
            }
          </Heading>
          {tab.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
}
