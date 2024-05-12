import { useMemo, useState } from "react";
import "./App.css";
import { formatNote } from "./lib";
import { List, Switch, Typography } from "antd";
import { CopiableLine } from "./components";

const { Title } = Typography;

const JKLEX = "https://www.cnblogs.com/farter/articles/jklex.html";
const REPO = "https://github.com/yinyanfr/jikenloid-clipper";

function App() {
  const notes = useMemo(() => formatNote(), []);
  const [checked, setChecked] = useState(false);

  return (
    <main>
      <List<FormattedNote>
        size="large"
        header={
          <div>
            <Title level={2}>
              <a href={JKLEX} target="_blank" rel="noopener noreferrer">
                金坷垃EX音源
              </a>
              唱名选择复制器
            </Title>
            <Title level={5}>复制台词文字可自动复制完整唱名</Title>
            <Switch
              checked={checked}
              onChange={(value) => {
                setChecked(value);
              }}
              unCheckedChildren="显示简略唱名"
              checkedChildren="显示完整唱名"
            />
          </div>
        }
        footer={
          <footer className="line">
            <a href={REPO} target="_blank" rel="noopener noreferrer">
              Github
            </a>
          </footer>
        }
        dataSource={notes}
        itemLayout="horizontal"
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<span className="line non-select">{item.id}</span>}
              title={
                <span className="line">
                  <span className="non-select">{item.speaker}：</span>
                  <CopiableLine note={item} />
                </span>
              }
              description={item.notes
                .map((note) => (checked ? `"${note} ${item.id}"` : note))
                .join(" ")}
            />
          </List.Item>
        )}
      />
    </main>
  );
}

export default App;
