import { Table, Group, Text, Avatar } from "@mantine/core";
import React, { useState } from "react";
import { useGetSpacesQuery } from "@/features/space/queries/space-query.ts";
import SpaceSettingsModal from "@/features/space/components/settings-modal.tsx";
import { useDisclosure } from "@mantine/hooks";

export default function SpaceList() {
  const { data, isLoading } = useGetSpacesQuery();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>(null);

  const handleClick = (spaceId: string) => {
    setSelectedSpaceId(spaceId);
    open();
  };

  return (
    <>
      {data && (
        <Table highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Space</Table.Th>
              <Table.Th>Members</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {data?.items.map((space, index) => (
              <Table.Tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(space.id)}
              >
                <Table.Td>
                  <Group gap="sm">
                    <Avatar color="gray" radius="xl">
                      {space.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                      <Text fz="sm" fw={500}>
                        {space.name}
                      </Text>
                      <Text fz="xs" c="dimmed">
                        {space.description}
                      </Text>
                    </div>
                  </Group>
                </Table.Td>

                <Table.Td>{space.memberCount} members</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}

      {selectedSpaceId && (
        <SpaceSettingsModal
          opened={opened}
          onClose={close}
          spaceId={selectedSpaceId}
        />
      )}
    </>
  );
}