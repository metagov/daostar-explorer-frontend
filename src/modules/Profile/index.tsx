import { NextPageContext } from "next";
import { GetServerSidePropsContext } from "next/types";
import { useEffect, useState } from "react";
import { isAddress } from "web3-validator";

import { getContributions, APIResponseError } from "~/lib/api";

import type { Contribution } from "~/lib/types";

import { styled } from "~/styles/stitches.config";

import CenteredLayout from "~/layouts/CenteredLayout";

import AddressSearch from "~/components/shared/AddressSearch";
import ContributionCard from "~/components/shared/ContributionCard";
import ReputationCard from "~/components/shared/ReputationCard";
import Box from "~/components/ui/Box";
import { Regular, Title } from "~/components/ui/Typography";

interface ProfileProps {
  address: string;
}

interface SectionContent {
  data: Contribution[];
  isFetching: boolean;
  errors: APIResponseError[] | null;
}

interface ContributionListProps {
  contributions: Contribution[];
}

const HeaderWrapper = styled(Box, {
  display: "flex",
  flexDirection: "column",
  fontFamily: "$IBMPlexSans",
  color: "white",
  gap: "$16",
});

const sectionContentWithoutData = (
  isFetching: boolean,
  errors: APIResponseError[] | null,
) => {
  if (isFetching) return <Regular>Fetching...</Regular>;
  if (errors)
    return <Regular>{errors.map((e) => e.message).join("\n")}</Regular>;

  return null;
};

const ReputationList = () => {
  return (
    <CardListWrapper>
      <ReputationCard />
    </CardListWrapper>
  );
};

const ContributionList = ({ contributions }: ContributionListProps) => {
  return (
    <CardListWrapper>
      {contributions.map((c) => (
        <ContributionCard key={c.id} {...c} />
      ))}
    </CardListWrapper>
  );
};

const ContributionSection = ({ isFetching, errors, data }: SectionContent) => {
  return (
    <HeaderWrapper>
      <Title>Profile</Title>
      {sectionContentWithoutData(isFetching, errors) || (
        <ContributionList contributions={data} />
      )}
    </HeaderWrapper>
  );
};

const ReputationSection = ({ isFetching, errors }: SectionContent) => {
  return (
    <HeaderWrapper>
      <Title>Reputation</Title>
      {sectionContentWithoutData(isFetching, errors) || <ReputationList />}
    </HeaderWrapper>
  );
};

const Address = ({ address }: { address: string }) => (
  <p>
    <strong>
      Address: <Regular>{address}</Regular>
    </strong>
  </p>
);

const CardListWrapper = styled(Box, {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "$42 $16",
});

const LayoutContainer = styled(Box, {
  display: "flex",
  flexDirection: "column",
  gap: "$42",
});

const ContentContainer = styled(Box, {
  display: "flex",
  flexDirection: "column",
  gap: "$30",
  color: "$white",
  fontFamily: "$IBMPlexSans",
});

export default function Profile(props: ProfileProps) {
  const { address } = props;
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [errors, setErrors] = useState<APIResponseError[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      const { data, errors } = await getContributions(address);

      if (data) {
        setContributions(data.data);
      }

      if (errors) {
        setErrors(errors);
      }

      setIsFetching(false);
    };

    if (isAddress(address)) {
      fetchData();
    } else {
      setErrors([{ status: 401, message: "Invalid address" }]);
      setIsFetching(false);
    }
  }, [address]);

  return (
    <CenteredLayout>
      <LayoutContainer>
        <AddressSearch />
        <ContentContainer>
          <Address address={address} />

          <ReputationSection
            data={[]}
            isFetching={isFetching}
            errors={errors}
          />

          <ContributionSection
            data={contributions}
            isFetching={isFetching}
            errors={errors}
          />
        </ContentContainer>
      </LayoutContainer>
    </CenteredLayout>
  );
}

Profile.getInitialProps = async (ctx: NextPageContext) => {
  const { address } = ctx.query;

  return {
    address,
  };
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: { previousRoute: context.req.headers.referer ?? null },
  };
}